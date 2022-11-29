// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./interfaces/IDistributor.sol";

contract Proxy {
    using SafeERC20 for IERC20;

    event TransferForward(address indexed target, IERC20 indexed token, address sender, uint256 amount, uint256 commissions);
    event TransferBack(address indexed target, IERC20 indexed token, address sender, uint256 amount);

    struct TokensIn {
        IERC20 token; 
        uint256 amount;
        bool directTransfer;
        IDistributor.Commission[] commissions;
    }

    IDistributor immutable distributor;
    constructor(IDistributor _distributor) {
        distributor = _distributor;
    }

    function _transferAssetFrom(IERC20 token, uint256 amount) internal returns (uint256 balance) {
        balance = token.balanceOf(address(this));
        token.safeTransferFrom(msg.sender, address(this), amount);
        balance = token.balanceOf(address(this)) - balance;
    }
    function safeTransferETH(address to, uint value) internal {
        (bool success,) = to.call{value:value}(new bytes(0));
        require(success, 'TransferHelper: ETH_TRANSFER_FAILED');
    }

    function proxyCall(address target, TokensIn[] calldata tokensIn, address to, IERC20[] calldata tokensOut, bytes memory data) public payable {
        // save the ETH and token balances before execution
        uint256 length = tokensOut.length;
        uint256[] memory outAmounts = new uint256[](length);
        for (uint256 i = 0 ; i < length ; i++) {
            outAmounts[i] = address(tokensOut[i]) == address(0) ? address(this).balance : tokensOut[i].balanceOf(address(this));
        }

        // transfer token to target 
        length = tokensIn.length;
        uint ethAmount;
        for (uint256 i = 0 ; i < length ; i++) {
            TokensIn calldata transfer = tokensIn[i];
            uint256 totalCommissions;
            {
            uint256 length2 = transfer.commissions.length;
            for (uint256 j = 0 ; j < length2 ; j++ ){
                totalCommissions += transfer.commissions[j].amount;
            }
            }
            uint amount = transfer.amount - totalCommissions;

            if (address(transfer.token) == address(0)) {
                require(msg.value == transfer.amount, "ETH amount not matched");
                distributor.addCommissions{value:totalCommissions}(IERC20(address(0)), transfer.commissions);
                ethAmount = amount;
            } else {
                // transfer commissions to distributor
                transfer.token.safeTransferFrom(msg.sender, address(distributor), totalCommissions);
                distributor.addCommissions(transfer.token, transfer.commissions);

                // transfer / approve tokens to target
                if (transfer.directTransfer) {
                    transfer.token.safeTransferFrom(msg.sender, target, amount);
                } else {
                    amount = _transferAssetFrom(transfer.token, amount);
                    // optional, may make a list of tokens need to reset first
                    transfer.token.safeApprove(target, 0);
                    transfer.token.safeApprove(target, amount);
                }
            }
            emit TransferForward(target, transfer.token, msg.sender, amount, totalCommissions);
        }

        // call target
        //  uint256 inOffset = // selector q + referrer + target
        //                     4 + 0x20 + 0x20 + 
        //                    // tokenIns + amounts + directTransfer
        //                    (3 * 0x20 * (length + 2)) + 
        //                    // to
        //                    0x20 +
        //                    // tokensOut  
        //                    (0x20 * (tokensOut.length +2)) +
        //                    // data (pointer / length)
        //                    0x20 + 0x20;
        //  uint256 insize = data.length;
        assembly {
            let ret := call(gas(), target, ethAmount, add(0x20,data), mload(data), 0, 0)
            // returndatacopy(0, 0, returndatasize())
            if eq(0, ret) {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }
        }

        // transfer token back
        length = tokensOut.length;
        for (uint256 i = 0 ; i < length ; i++) {
            uint256 amount;
            if (address(tokensOut[i]) == address(0)) {
                amount = address(this).balance - outAmounts[i];
                safeTransferETH(to, amount);
            } else  {
                amount = tokensOut[i].balanceOf(address(this)) - outAmounts[i];
                tokensOut[i].safeTransfer(to, amount);
            }
            emit TransferBack(target, tokensOut[i], to, amount);
        }
        assembly {
             returndatacopy(0, 0, returndatasize())
             return(0, returndatasize())
        }
    }
}