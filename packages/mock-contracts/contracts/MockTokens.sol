// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract MockErc20 is ERC20PresetMinterPauser {
    uint8 immutable private _decimals;
    constructor(string memory name, string memory symbol, uint8 _decimals_) 
        ERC20PresetMinterPauser(name, symbol)
    {
        _decimals = _decimals_;
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}