import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999
          }
        }
      },
      {
        version: "0.4.26",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        }
      }
    ]
  },
  paths: {
    root: "../packages/mock-contracts",
    sources: "./contracts",
    artifacts: "../../hardhat/artifacts", 
    cache: "../../hardhat/cache"
  }
};

export default config;
