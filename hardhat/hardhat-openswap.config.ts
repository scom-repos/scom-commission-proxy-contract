import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
    solidity: {
      compilers:[
        {
          version: "0.6.11",
          settings: {
            optimizer: {
              enabled: true,
              runs: 999999,
            }
          }
        }
      ],
      overrides:{
        "contracts/restricted/OSWAP_RestrictedPair1.sol": {
          version: "0.6.11",
          settings: {
            optimizer: {
              enabled: true,
              runs: 5000,
            }
          }
        },
        "contracts/restricted/OSWAP_RestrictedPair3.sol": {
          version: "0.6.11",
          settings: {
            optimizer: {
              enabled: true,
              runs: 5000,
            }
          }
        },
        "contracts/restricted/OSWAP_RestrictedPair4.sol": {
          version: "0.6.11",
          settings: {
            optimizer: {
              enabled: true,
              runs: 5000,
            }
          }
        },
        "contracts/restricted/OSWAP_RestrictedPairCreator.sol": {
          version: "0.6.11",
          settings: {
            optimizer: {
              enabled: true,
              runs: 5000,
            }
          }
        },
        "test2/test/contracts/OSWAP_RestrictedPairCreator.sol": {
          version: "0.6.11",
          settings: {
            optimizer: {
              enabled: true,
              runs: 5000,
            }
          }
        },
        "contracts/router/OSWAP_HybridRouter2.sol": {
          version: "0.6.11",
          settings: {
            optimizer: {
              enabled: true,
              runs: 30000,
            }
          }
        }
      }
    },
    paths: {
      root: "../packages/openswap",
      sources: "./contracts/",
      artifacts: "../../hardhat/artifacts",
      cache: "../../hardhat/cache",
    }
  };

export default config;
