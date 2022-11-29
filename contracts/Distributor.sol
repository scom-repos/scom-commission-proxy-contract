// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IDistributor.sol";

contract Distributor is IDistributor {
    mapping(IERC20 => uint256) public lastBalance;
    mapping(address => mapping(IERC20 => uint256)) public distributions;

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
        lastBalance[token] += currentBalance;
    }
}