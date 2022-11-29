// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

// import "../contracts/oracle/interfaces/IOSWAP_OracleAdaptor.sol";

contract MockOracleAdaptor3 /*is IOSWAP_OracleAdaptor*/ {

    uint8 public immutable decimals;
    address public immutable weth;
    mapping(address => uint256) prices;

    constructor(address _weth, uint8 _decimals, address[] memory _tokens, uint256[] memory _prices) {
        weth = _weth;
        decimals = _decimals;
        require(_tokens.length == _prices.length, "length not match");
        uint256 length = _tokens.length;
        for (uint256 i = 0 ; i < length ; i++) {
            prices[_tokens[i]] = _prices[i];
        }
    }
    function isSupported(address from, address to) external view returns (bool supported) {
        return prices[from] > 0 || prices[to] > 0;
    }
    function getRatio(address from, address to, uint256 /*fromAmount*/, uint256 /*toAmount*/, bytes calldata /*payload*/) external view returns (uint256 numerator, uint256 denominator) {
        numerator = prices[from];
        denominator = prices[to];
    }
    function getLatestPrice(address from, address to, bytes calldata /*payload*/) external view returns (uint256 price) {
        price = prices[from] * (10**uint256(decimals)) / prices[to];
    }
    function setPrice(address token, uint256 price) external {
        prices[token] = price;
    }
}

contract MockOracleAdaptor /*is IOSWAP_OracleAdaptor*/ {

    uint256 constant WEI = 1e18;
    uint256 constant WEI_SQ = 1e36;

    uint8 public immutable decimals;
    address public immutable weth;
    struct Fraction {
        uint256 numerator;
        uint256 denominator;
    }
    mapping(address => mapping(address => Fraction)) prices;

    constructor(address _weth, uint8 _decimals, address[] memory _tokens, uint256[] memory _prices) {
        require(_tokens.length == _prices.length, "length not match");
        weth = _weth;
        decimals = _decimals;
        uint256 multiplier = 10**uint256(_decimals);
        uint256 length = _tokens.length;
        for (uint256 i = 0 ; i < length ; i++) {
            prices[_tokens[i]][_weth] = Fraction({numerator:multiplier, denominator:_prices[i]});
            prices[_weth][_tokens[i]] = Fraction({numerator:_prices[i], denominator:multiplier});
            for (uint256 j = i+1 ; j < length ; j++) {
                prices[_tokens[i]][_tokens[j]] = Fraction({numerator:_prices[j], denominator:_prices[i]});
                prices[_tokens[j]][_tokens[i]] = Fraction({numerator:_prices[i], denominator:_prices[j]});
            }
        }

    }
    function isSupported(address from, address to) external view returns (bool supported) {
        Fraction storage f = prices[from][to];
        return f.denominator > 0 && f.denominator > 0;
    }
    function getRatio(address from, address to, uint256 /*fromAmount*/, uint256 /*toAmount*/, bytes calldata /*payload*/) external view returns (uint256 numerator, uint256 denominator) {
        Fraction storage f = prices[from][to];
        numerator = f.numerator;
        denominator = f.denominator;
    }
    function getLatestPrice(address from, address to, bytes calldata /*payload*/) external view returns (uint256 price) {
        Fraction storage f = prices[from][to];
        price = f.numerator / f.denominator;
    }
    function setPrice(address token, uint256 price) external {
        uint256 multiplier = 10**uint256(decimals);
        prices[token][weth] = Fraction({numerator: price, denominator: multiplier});
        prices[weth][token] = Fraction({numerator: multiplier, denominator: price});
    }
    function setPrice(address token0, address token1, uint256 price0, uint256 price1) external {
        prices[token0][token1] = Fraction({numerator: price0, denominator: price1});
        prices[token1][token0] = Fraction({numerator: price1, denominator: price0});
    }
}
