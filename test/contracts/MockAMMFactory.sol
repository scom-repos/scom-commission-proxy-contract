// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MockAMMPair.sol";

contract MockAMMFactory {
    event PairCreated(IERC20 indexed token0, IERC20 indexed token1, MockAMMPair pair, uint newSize);

    mapping (IERC20=>mapping(IERC20=>MockAMMPair)) getPair;
    MockAMMPair[] public allPairs;

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    function createPair(IERC20 token0, IERC20 token1) external returns(MockAMMPair pair) {
        pair = new MockAMMPair(token0, token1);
        allPairs.push(pair);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

}

