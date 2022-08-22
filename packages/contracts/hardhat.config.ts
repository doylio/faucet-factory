require("dotenv").config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const DEPLOY_KEY = process.env.DEPLOY_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [`0x${DEPLOY_KEY}`],
    },
  },
};

export default config;
