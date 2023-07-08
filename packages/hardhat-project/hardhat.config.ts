import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// .env
import dotenv from "dotenv"
dotenv.config()
const { INFURA_API_KEY, ETH_PRIVATE_KEY } = process.env

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      blockGasLimit: 3000000 // ! Default 30_000_000
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${ETH_PRIVATE_KEY}`]
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${ETH_PRIVATE_KEY}`]
    }
  },
  gasReporter: {
    enabled: true,
  },
};

export default config;
