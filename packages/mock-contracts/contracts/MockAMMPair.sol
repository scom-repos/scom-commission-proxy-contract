// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MockAMMPair {
    using SafeERC20 for IERC20;

    event Mint(address indexed sender, uint amount0, uint amount1);
    event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to);
    event Sync(uint112 reserve0, uint112 reserve1);

    IERC20 public immutable token0;
    IERC20 public immutable token1;

    uint112 public reserve0;
    uint112 public reserve1;
    uint32  public blockTimestampLast;

    constructor(IERC20 _token0, IERC20 _token1) {
        require(address(0) < address(_token0) && address(_token0) < address(_token1));
        token0 = _token0;
        token1 = _token1;
    }
    
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }

    function addLiquidity(uint256 amount0In, uint256 amount1In) external {
        token0.safeTransferFrom(msg.sender, address(this), amount0In);
        token1.safeTransferFrom(msg.sender, address(this), amount1In);
        emit Mint(msg.sender, amount0In, amount1In);
        sync();
    }
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata /*data*/) external {
        uint256 amount0In = token0.balanceOf(address(this)) - reserve0;
        uint256 amount1In = token1.balanceOf(address(this)) - reserve1;
        if (amount0Out > 0)
            token0.safeTransfer(to, amount0Out);
        if (amount1Out > 0)
            token1.safeTransfer(to, amount1Out);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
        sync();
    }
    function sync() public {
        reserve0 = uint112(token0.balanceOf(address(this)));
        reserve1 = uint112(token1.balanceOf(address(this)));
        blockTimestampLast = uint32(block.timestamp);
        emit Sync(reserve0, reserve1);
    }
}