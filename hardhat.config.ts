import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

import * as fs from 'fs';

// Lee la clave privada desde el archivo secret.txt
const privateKey = fs.readFileSync("secret.txt", "utf-8").trim();

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 421614
    },
    Arbitrum: {
      url: "https://arbitrum-sepolia.infura.io/v3/cf29898319594df799ef861b6dab7198",
      accounts: [privateKey],
      gasPrice: 1000000000,
    }
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
    }
  }
}
};

export default config;