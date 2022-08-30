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
    mumbai: {
      url: "https://polygon-testnet.public.blastapi.io",
      accounts: [`0x${DEPLOY_KEY}`],
    },
    arbitrumRinkeby: {
      url: "https://rinkeby.arbitrum.io/rpc",
      accounts: [`0x${DEPLOY_KEY}`],
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [`0x${DEPLOY_KEY}`],
    },
    fuji: {
      url: "https://rpc.ankr.com/avalanche_fuji",
      accounts: [`0x${DEPLOY_KEY}`],
    },
    optimismGoerli: {
      url: "https://goerli.optimism.io/",
      accounts: [`0x${DEPLOY_KEY}`],
    },
  },
};

export default config;
