import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { FaucetFactory, FaucetToken__factory } from "../typechain-types";

describe("FaucetFactory", function () {
  describe("Methods", async () => {
    let owner: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;
    let faucetFactory: FaucetFactory;

    beforeEach(async () => {
      [owner, user1, user2] = await ethers.getSigners();
      const FaucetFactoryFactory = await ethers.getContractFactory(
        "FaucetFactory"
      );
      faucetFactory = await FaucetFactoryFactory.connect(owner).deploy();
      await faucetFactory.deployed();
    });

    it("should create a faucet token with the right params", async () => {
      await faucetFactory
        .connect(user1)
        .createFaucetToken(
          "Token 1",
          "TK1",
          "http://image.url.com",
          18,
          1000,
          60
        );
      expect(await faucetFactory.faucetCount()).to.eq(1);

      const faucetAddress = await faucetFactory.faucets(0);
      expect(faucetAddress).to.not.eq(ethers.constants.AddressZero);

      const faucet = await ethers.getContractAt("FaucetToken", faucetAddress);
      expect(await faucet.name()).to.eq("Token 1");
      expect(await faucet.symbol()).to.eq("TK1");
      expect(await faucet.imageUrl()).to.eq("http://image.url.com");
      expect(await faucet.decimals()).to.eq(18);
      expect(await faucet.dropletAmount()).to.eq(1000);
      expect(await faucet.claimInterval()).to.eq(60);
      expect(await faucet.owner()).to.eq(user1.address);
    });

    it("should increment when a new faucet is created", async () => {
      await faucetFactory
        .connect(user1)
        .createFaucetToken(
          "Token 1",
          "TK1",
          "http://image.url.com",
          18,
          1000,
          60
        );
      expect(await faucetFactory.faucetCount()).to.eq(1);

      await faucetFactory 
        .connect(user2)
        .createFaucetToken(
          "Token 2",
          "TK2",
          "http://image.url.com",
          18,
          1000,
          60
        );
        
      expect(await faucetFactory.faucetCount()).to.eq(2);
    })
  });
});
