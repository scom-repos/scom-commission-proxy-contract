// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interfaces/IDistributor.sol";

contract Distributor is IDistributor {
    using SafeERC20 for IERC20;

    event Claim(address indexed from, IERC20 token, uint256 amount);

    mapping(IERC20 => uint256) public lastBalance;
    mapping(address => mapping(IERC20 => uint256)) public distributions;

    function safeTransferETH(address to, uint value) internal {
        (bool success,) = to.call{value:value}(new bytes(0));
        require(success, 'TransferHelper: ETH_TRANSFER_FAILED');
    }

    // transfer token amount to this contract first then call this function
    function addCommissions(IERC20 token, Commission[] calldata commissions) external payable {
        uint256 length = commissions.length;
        uint256 totalCommissions;
        for (uint256 i = 0 ; i < length ; i++) {
            Commission calldata commission = commissions[i];
            totalCommissions += commission.amount;
            distributions[commission.to][token] += commission.amount;
            emit AddCommission(commission.to, token, commission.amount);
        }
        uint256 currentBalance = (address(token) == address(0)) ? address(this).balance : token.balanceOf(address(this));
        require(currentBalance >= lastBalance[token] + totalCommissions, "Underfund");
        lastBalance[token] = currentBalance;
    }
    function claim(IERC20 token) public {
        uint256 balance = distributions[msg.sender][token];
        distributions[msg.sender][token] = 0;
        lastBalance[token] -= balance;
        if (address(token) == address(0)) {
            safeTransferETH(msg.sender, balance);
        } else {
            token.safeTransfer(msg.sender, balance);
        }
        emit Claim(msg.sender, token, balance);
    }
    function claimMultiple(IERC20[] calldata tokens) external {
        uint256 length = tokens.length;
        for (uint256 i ; i < length ; i++) {
            claim(tokens[i]);
        }
    }
}