// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ProxyV2 {
    using SafeERC20 for IERC20;

    event TransferForward(address indexed target, IERC20 indexed token, address sender, uint256 amount, uint256 commissions);
    event TransferBack(address indexed target, IERC20 indexed token, address sender, uint256 amount);
    event Claim(address indexed from, IERC20 token, uint256 amount);
    event AddCommission(address to, IERC20 token, uint256 amount);
    event Skim(IERC20 indexed token, address indexed to, uint256 amount);

    struct Commission {
        address to;
        uint256 amount;
    } 
    struct TokensIn {
        IERC20 token; 
        uint256 amount;
        bool directTransfer;
        Commission[] commissions;
        uint256 totalCommissions;
    }
    struct ClaimantInfo {
        address claimant;
        IERC20 token;
        uint256 balance;
    }

    uint256 public claimantIdCount;
    mapping(IERC20 => uint256) public lastBalance;
    mapping(uint256 => ClaimantInfo) public claimantsInfo; //claimantsInfo[id] = ClaimantInfo;
    mapping(address => mapping(IERC20 => uint256)) public claimantIds; //claimantIds[address][IERC20] = id;

    receive() external payable {}

    function _transferAssetFrom(IERC20 token, uint256 amount) internal returns (uint256 balance) {
        balance = token.balanceOf(address(this));
        token.safeTransferFrom(msg.sender, address(this), amount);
        balance = token.balanceOf(address(this)) - balance;
    }

    function safeTransferETH(address to, uint value) internal {
        (bool success,) = to.call{value:value}(new bytes(0));
        require(success, 'TransferHelper: ETH_TRANSFER_FAILED');
    }

    function addToDistributions(address claimant, IERC20 token, uint256 amount) internal {
        uint256 claimantId = claimantIds[claimant][token];
        if (claimantId == 0) {
            ++claimantIdCount;
            claimantsInfo[claimantIdCount] = ClaimantInfo({
                claimant: claimant,
                token: token,
                balance: amount
            });
            claimantIds[claimant][token] = claimantIdCount;
        }
        else {
            claimantsInfo[claimantId].balance += amount;
        }
    }

    function getClaimantBalance(address claimant, IERC20 token) external view returns (uint256) {
        uint256 claimantId = claimantIds[claimant][token];
        return claimantsInfo[claimantId].balance;
    }

    function getClaimantsInfo(uint256 fromId, uint256 count) external view returns (ClaimantInfo[] memory claimantInfoList) {
        require(fromId > 0 && fromId <= claimantIdCount, "out of bounds");
        uint256 toId = fromId + count - 1;
        if (toId > claimantIdCount) {
            toId = claimantIdCount;
            count = toId - fromId + 1;
        }
        claimantInfoList = new ClaimantInfo[](count);
        uint256 currId = fromId;
        for (uint256 i = 0; i < count; i++) {
            claimantInfoList[i] = claimantsInfo[currId];
            ++currId;
        }
    }
    
    function tokenIn(address target, TokensIn calldata tokensIn, bytes memory data) external {
        // transfer token to target 
        TokensIn calldata transfer = tokensIn;
        uint256 totalCommissions;
        uint256 length2 = transfer.commissions.length;
        for (uint256 j = 0 ; j < length2 ; j++ ){
            Commission calldata commission = transfer.commissions[j];
            totalCommissions += commission.amount;
            addToDistributions(commission.to, tokensIn.token, commission.amount);   
            emit AddCommission(commission.to, tokensIn.token, commission.amount);
        }
        uint amount;

        lastBalance[transfer.token] += totalCommissions;

        // transfer / approve tokens to target
        if (transfer.directTransfer) {
            uint256 actualTotalCommission = _transferAssetFrom(transfer.token, transfer.totalCommissions);
            require(actualTotalCommission >= totalCommissions, "commission amount not matched");
            amount = transfer.amount - transfer.totalCommissions;
            transfer.token.safeTransferFrom(msg.sender, target, amount);
        } else {
            uint256 actualAmount = _transferAssetFrom(transfer.token, transfer.amount);
            require(actualAmount >= transfer.amount, "amount not matched");
            amount = actualAmount - totalCommissions;
            // optional, may make a list of tokens need to reset first
            transfer.token.safeApprove(target, 0);
            transfer.token.safeApprove(target, amount);
        }
        emit TransferForward(target, transfer.token, msg.sender, amount, totalCommissions);

        assembly {
            let ret := call(gas(), target, 0, add(0x20,data), mload(data), 0, 0)
            // returndatacopy(0, 0, returndatasize())
            if eq(0, ret) {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }
            returndatacopy(0, 0, returndatasize())
            return(0, returndatasize())
        }
    }
    function ethIn(address target, Commission[] calldata commissions, bytes memory data) external payable {
        // transfer ETH to target 
        uint256 totalCommissions;
        uint256 length2 = commissions.length;
        for (uint256 j = 0 ; j < length2 ; j++ ){
            Commission calldata commission = commissions[j];
            totalCommissions += commission.amount;
            addToDistributions(commission.to, IERC20(address(0)), commission.amount);  
            emit AddCommission(commission.to, IERC20(address(0)), commission.amount);
        }
        uint amount = msg.value - totalCommissions;

        lastBalance[IERC20(address(0))] += totalCommissions;

        emit TransferForward(target, IERC20(address(0)), msg.sender, amount, totalCommissions);

        assembly {
            let ret := call(gas(), target, amount, add(0x20,data), mload(data), 0, 0)
            // returndatacopy(0, 0, returndatasize())
            if eq(0, ret) {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }
            returndatacopy(0, 0, returndatasize())
            return(0, returndatasize())
        }
    }

    function proxyCall(address target, TokensIn[] calldata tokensIn, address to, IERC20[] calldata tokensOut, bytes memory data) external payable {
        // transfer token to target 
        uint256 length = tokensIn.length;
        uint ethAmount;
        for (uint256 i = 0 ; i < length ; i++) {
            TokensIn calldata transfer = tokensIn[i];
            uint256 totalCommissions;
            {
            uint256 length2 = transfer.commissions.length;
            for (uint256 j = 0 ; j < length2 ; j++ ){
                Commission calldata commission = transfer.commissions[j];
                totalCommissions += commission.amount;
                addToDistributions(commission.to, transfer.token, commission.amount); 
                emit AddCommission(commission.to, transfer.token, commission.amount);
            }
            }
            uint amount;
            lastBalance[transfer.token] += totalCommissions;

            if (address(transfer.token) == address(0)) {
                require(ethAmount == 0, "more than one ETH transfer");
                require(msg.value == transfer.amount, "ETH amount not matched");
                amount = transfer.amount - totalCommissions;
                ethAmount = amount;
            } else {
                // transfer / approve tokens to target
                if (transfer.directTransfer) {               
                    uint256 actualTotalCommission = _transferAssetFrom(transfer.token, transfer.totalCommissions);
                    require(actualTotalCommission >= totalCommissions, "commission amount not matched");
                    amount = transfer.amount - transfer.totalCommissions;
                    transfer.token.safeTransferFrom(msg.sender, target, amount);
                } else {
                    uint256 actualAmount = _transferAssetFrom(transfer.token, transfer.amount);
                    require(actualAmount >= transfer.amount, "amount not matched");
                    amount = actualAmount - totalCommissions;
                    // optional, may make a list of tokens need to reset first
                    transfer.token.safeApprove(target, 0);
                    transfer.token.safeApprove(target, amount);
                }
            }
            emit TransferForward(target, transfer.token, msg.sender, amount, totalCommissions);
        }

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
                amount = address(this).balance - lastBalance[IERC20(address(0))];
                safeTransferETH(to, amount);
            } else  {
                amount = tokensOut[i].balanceOf(address(this)) - lastBalance[tokensOut[i]];
                tokensOut[i].safeTransfer(to, amount);
            }
            emit TransferBack(target, tokensOut[i], to, amount);
        }
        assembly {
            returndatacopy(0, 0, returndatasize())
            return(0, returndatasize())
        }
    }

    // commissions
    function _claim(IERC20 token) internal {
        uint256 claimantId = claimantIds[msg.sender][token];
        ClaimantInfo memory claimantInfo = claimantsInfo[claimantId];
        uint256 balance = claimantInfo.balance;
        claimantsInfo[claimantId].balance = 0;
        lastBalance[token] -= balance;
        if (address(token) == address(0)) {
            safeTransferETH(msg.sender, balance);
        } else {
            token.safeTransfer(msg.sender, balance);
        }
        emit Claim(msg.sender, token, balance);
    }

    function claim(IERC20 token) external {
        _claim(token);
    }

    function claimMultiple(IERC20[] calldata tokens) external {
        uint256 length = tokens.length;
        for (uint256 i ; i < length ; i++) {
            _claim(tokens[i]);
        }
    }

    // transfer excess tokens to caller
    function skim(IERC20[] calldata tokens) external {
        uint256 length = tokens.length;
        for (uint256 i = 0 ; i < length ; i++) {
            uint256 amount;
            IERC20 token = tokens[i];
            if (address(token) == address(0)) {
                amount = address(this).balance;
                amount = amount - lastBalance[IERC20(address(0))];
                safeTransferETH(msg.sender, amount);
            } else {
                amount = token.balanceOf(address(this));
                amount = amount - lastBalance[token];
                token.safeTransfer(msg.sender, amount);
            }
            emit Skim(token, msg.sender, amount);
        }
    }
}