module.exports = 
 {
    "mainnet": {
        "networkId": 1,
        "rpc": `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
        "weth9Token": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "blockGasLimit": 12000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":20
    },
    "goerli": {
        "networkId": 5,
        // "rpc": `https://goerli.infura.io/v3/${process.env.INFURA_ID}`,
        "rpc": "https://rpc.ankr.com/eth_goerli",
        "weth9Token": "",
        "blockGasLimit": 30000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":12
    },
    "sepolia": {
        "networkId": 11155111,
        "rpc": "https://rpc.sepolia.org",
        // "rpc": "https://rpc-sepolia.rockx.com",
        "weth9Token": "",
        "blockGasLimit": 30000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":12
    },
    "ganache": {
        "networkId": 1337,
        "rpc": "http://ganache:8545",
        "rpcOptions": {keepAlive:false/*,timeout: 30000*/},
        "blockGasLimit": 6000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":0
    },
    "ganache2": {
        "networkId": 1338,
        "rpc": "http://ganache2:8545",
        "rpcOptions": {keepAlive:false/*,timeout: 30000*/},
        "blockGasLimit": 6000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":0
    },
    "hostGanache": {
        "networkId": 1337,
        "rpc": "http://host.docker.internal:7545",
        "rpcOptions": {keepAlive:false/*,timeout: 30000*/},
        "blockGasLimit": 6000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":3
    },
    "localGanache": {
        "networkId": 1337,
        "blockGasLimit": 6000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":1
    },
    "localGanache2": {
        "networkId": 1338,
        "blockGasLimit": 6000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":1
    },
    "hardhat": {
        "networkId": 31337,
        "rpc": "http://hardhat:8545",
        "rpcOptions": {keepAlive:false/*,timeout: 30000*/},
        "blockGasLimit": 30000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":0
    },
    "hardhat2": {
        "networkId": 31338,
        "rpc": "http://hardhat2:8545",
        "rpcOptions": {keepAlive:false/*,timeout: 30000*/},
        "blockGasLimit": 30000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":0
    },
    "hostHardhat": {
        "networkId": 31337,
        "rpc": "http://host.docker.internal:8545",
        "rpcOptions": {keepAlive:false/*,timeout: 30000*/},
        "blockGasLimit": 30000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":2
    },
    "localHardhat": {
        "networkId": 31337,
        "blockGasLimit": 30000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":0
    },
    "localHardhat2": {
        "networkId": 31338,
        "blockGasLimit": 30000000,
        "wrappedUtilityToken": "WETH9",
        "blockTime":0
    },
    "binanceMainnet": {
        "networkId": 56,
        "rpc": "https://bsc-dataseed.binance.org/",
        "blockGasLimit": 30000000,
        "weth9Token": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "wrappedUtilityToken": "WBNB",
        "blockTime":10
    },
    "binanceTestnet": {
        "networkId": 97,
        "rpc": "https://data-seed-prebsc-1-s1.binance.org:8545/",
        "blockGasLimit": 30000000,
        "forceGasPrice": "20000000000",
        "weth9Token_PancakeSwap": "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
        "weth9Token_BakerySwap": "0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F",
        "weth9Token_BurgerSwap": "0x2f8b72301c05c444585d24B93e1e06bE9D0c35b2",
        "weth9Token": "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
        "wrappedUtilityToken": "WBNB",
        "blockTime":3
    },
    "binance": {
        "networkId": 56,
        "rpc": "https://bsc-dataseed.binance.org/",
        "blockGasLimit": 30000000,
        "weth9Token": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "wrappedUtilityToken": "WBNB",
        "blockTime":3
    },
    "avalancheTestnet": {
        "networkId": 43113,
        "rpc": "https://api.avax-test.network/ext/bc/C/rpc",
        "blockGasLimit": 30000000,
        "weth9Token": "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
        "blockTime":3
    },    
    "avalanche": {
        "networkId": 43114,
        "rpc": "https://api.avax.network/ext/bc/C/rpc",
        "blockGasLimit": 30000000,
        "weth9Token": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        "blockTime":2
    },
    "aminoTestnet": {
        "networkId": 31337,
        "rpc": "https://leucine0.node.alphacarbon.network",
        "blockGasLimit": 15000000,
        "weth9Token": "0xBB04C4927A05Cf7d3e329E6333658D48A9313356",
        "wrappedUtilityToken": "ACT",
        "blockTime":30
    },
    "polygonTestnet": {
        "networkId": 80001,
        "_rpc": `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_ID}/polygon/mumbai`,
        "rpc": `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`,
        "blockGasLimit": 15000000,
        "weth9Token": "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
        "wrappedUtilityToken": "WMATIC",
        "blockTime":5
    }
}

