// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IDistributor {
    struct Commission {
        address to;
        uint256 amount;
    } 

    event AddCommission(address to, IERC20 token, uint256 amount);

    function lastBalance(IERC20 token) external view returns (uint256 lastBalance);
    function distributions(address account, IERC20 token) external view returns (uint256 distributions);

    function addCommissions(IERC20 token, Commission[] calldata commissions) external payable;
}