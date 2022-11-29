// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

contract MockPriceOracle {
    int256 price;
    address immutable owner;
    constructor() {
        owner = msg.sender;
    }
    function setPrice(int256 _price) external {
        require(msg.sender == owner, "not owner");
        price = _price;
    }
    function latestAnswer() external view returns (int256) {
        return price;
    } 
}