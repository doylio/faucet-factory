import { ethers } from "hardhat";
import fs from "fs/promises";
import path from "path";

async function main() {
  const network = process.env.HARDHAT_NETWORK;
  const Factory = await ethers.getContractFactory("FaucetFactory");

  const faucetFactory = await Factory.deploy();
  await faucetFactory.deployed();

  const timestamp = new Date().toISOString();

  await fs.appendFile(
    path.join(__dirname, "../deployments"),
    `\n${timestamp} - ${network} :: ${faucetFactory.address}`
  );

  console.log(
    `Faucet Factory deployed on ${network} to address ${faucetFactory.address}\r`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
