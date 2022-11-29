// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockRouter {
    using SafeERC20 for IERC20;

    address public immutable WETH;
    struct Path {
        address token;
        uint256 rate;
    }
    mapping(address => mapping(address => Path)) paths; // path[pair][tokenIn] = {tokenOut, rate}
    mapping(address => mapping(address => Path)) invPath; // pair[pair][tokenOut] = tokenIn;

    constructor(address _weth, address[] memory pair, address[] memory tokenIn, address[] memory tokenOut, uint256[] memory rate) payable {
        WETH = _weth;
        uint256 length = pair.length;
        require(length==tokenIn.length && length==tokenOut.length && length==rate.length, "length not matched");
        for (uint256 i ; i < length ; i++) {
            paths[pair[i]][tokenIn[i]] = Path({token: tokenOut[i], rate: rate[i]});
            paths[pair[i]][tokenOut[i]] = Path({token: tokenIn[i], rate: 1e36 / rate[i]});
        }
    }
    receive() external payable {
        // require(msg.sender == WETH, 'TRANSFER_FAILED'); // only accept ETH via fallback from the WETH contract
    }    
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata pair,
        address tokenIn,
        address to,
        uint /*deadline*/,
        bytes calldata /*data*/
    ) external returns (address[] memory path, uint[] memory amounts) {
        uint256 length = pair.length;
        path = new address[](length+1);
        amounts = new uint256[](length+1);
        path[0] = tokenIn;
        amounts[0] = amountIn;
        IERC20(tokenIn).safeTransferFrom(msg.sender, address(this), amountIn);
        for (uint256 i ; i < length ; i++) {
            Path storage _path = paths[pair[i]][path[i]];
            path[i+1] = _path.token;
            amounts[i+1] = amounts[i] * _path.rate / 1e18;
        }
        require(amountOutMin <= amounts[length], "insufficient output amount");
        IERC20(path[length]).safeTransfer(to, amounts[length]);
    }
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata pair,
        address tokenOut,
        address to,
        uint deadline,
        bytes calldata data
    ) external returns (address[] memory path, uint[] memory amounts) 
    {
    }
    function swapExactETHForTokens(uint amountOutMin, address[] calldata pair, address to, uint deadline, bytes calldata data)
        external
        payable
        returns (address[] memory path, uint[] memory amounts) 
    {
    }
    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata pair, address to, uint deadline, bytes calldata data)
        external
        returns (address[] memory path, uint[] memory amounts) 
    {
    }
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata pair, address to, uint /*deadline*/, bytes calldata /*data*/)
        external
        returns (address[] memory path, uint[] memory amounts) 
    {
        uint256 length = pair.length;
        path = new address[](length+1);
        amounts = new uint256[](length+1);
        path[length] = WETH;
        for (uint256 i = length ; i > 0 ; i--) {
            path[i-1] = invPath[pair[i-1]][path[i]].token;
        }
        IERC20(path[length]).safeTransferFrom(msg.sender, address(this), amountIn);
        amounts[0] = amountIn;
        for (uint256 i ; i < length ; i++) {
            Path storage _path = paths[pair[i]][path[i]];
            amounts[i+1] = amounts[i] * _path.rate / 1e18;
        }
        require(amountOutMin <= amounts[length], "insufficient output amount");

        safeTransferETH(to, amounts[length]);
    }
    function swapETHForExactTokens(uint amountOut, address[] calldata pair, address to, uint deadline, bytes calldata data)
        external
        payable
        returns (address[] memory path, uint[] memory amounts) {
    }

    function safeTransferETH(address to, uint value) internal {
        (bool success,) = to.call{value:value}(new bytes(0));
        require(success, 'TransferHelper: ETH_TRANSFER_FAILED');
    }
}
