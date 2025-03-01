import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
//import "@nomiclabs/hardhat-etherscan"; 

import { config as dotenvConfig } from "dotenv"; 
dotenvConfig(); 

import * as fs from "fs";


const PRIVATE_KEY = fs.existsSync("secret.txt")
  ? fs.readFileSync("secret.txt", "utf-8").trim()
  : process.env.PRIVATE_KEY || "";


const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 11155111 , //Sepolia
    },
    sepolia: {
      url: "https://eth-sepolia.public.blastapi.io",
      accounts: [PRIVATE_KEY], // Utiliza la clave privada.
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;

