import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { FaucetToken } from "../typechain-types";

describe("FaucetToken", function () {
  describe("Deployment", async () => {
    it("should deploy with the correct values", async () => {
      const [owner] = await ethers.getSigners();
      const FaucetTokenFactory = await ethers.getContractFactory("FaucetToken");
      const token = await FaucetTokenFactory.connect(owner).deploy(
        "Faucet Token",
        "FT",
        "http://faucet.token.com/img.png",
        18,
        ethers.utils.parseEther("1000"),
        60 * 60 * 24, // 1 day
        owner.address
      );
      await token.deployed();

      expect(await token.name()).to.equal("Faucet Token");
      expect(await token.symbol()).to.equal("FT");
      expect(await token.imageUrl()).to.equal(
        "http://faucet.token.com/img.png"
      );
      expect(await token.decimals()).to.equal(18);
      expect(await token.dropletAmount()).to.equal(
        ethers.utils.parseEther("1000")
      );
      expect(await token.claimInterval()).to.equal(60 * 60 * 24);
    });
  });

  describe("Methods", async () => {
    let owner: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;
    let faucetToken: FaucetToken;
    beforeEach(async () => {
      [owner, user1, user2] = await ethers.getSigners();
      const FaucetTokenFactory = await ethers.getContractFactory("FaucetToken");
      faucetToken = await FaucetTokenFactory.connect(owner).deploy(
        "Faucet Token",
        "FT",
        "http://faucet.token.com/img.png",
        18,
        ethers.utils.parseEther("1000"),
        60 * 60 * 24, // 1 day
        owner.address
      );
      await faucetToken.deployed();
    });

    describe("mint", async () => {
      it("should allow the owner to mint tokens", async () => {
        const amount = ethers.utils.parseEther("1");
        await faucetToken.connect(owner).mint(user1.address, amount);
        expect(await faucetToken.balanceOf(user1.address)).to.equal(amount);
      });

      it("should not allow non owners to mint", async () => {
        const amount = ethers.utils.parseEther("1");
        const tx = faucetToken.connect(user1).mint(user1.address, amount);
        await expect(tx).to.be.reverted;
        expect(await faucetToken.balanceOf(user1.address)).to.equal(0);
      });
    });

    describe("claimDroplet", async () => {
      it("should allow a user to claim a droplet", async () => {
        await faucetToken.connect(user1).claimDroplet();
        expect(await faucetToken.balanceOf(user1.address)).to.eq(
          await faucetToken.dropletAmount()
        );
        expect(await faucetToken.lastClaimedAt(user1.address)).to.not.eq(0);
      });

      it("should prevent a user from claiming again until the claimInterval has passed", async () => {
        await faucetToken.connect(user1).claimDroplet();
        const dropletAmount = await faucetToken.dropletAmount();
        expect(await faucetToken.balanceOf(user1.address)).to.eq(dropletAmount);

        let tx = faucetToken.connect(user1).claimDroplet();
        await expect(tx).to.be.reverted;

        tx = faucetToken.connect(user2).claimDroplet();
        await expect(tx).to.not.be.reverted;

        ethers.provider.send("evm_increaseTime", [60 * 60 * 24]);
        tx = faucetToken.connect(user1).claimDroplet();
        await expect(tx).to.not.be.reverted;

        expect(await faucetToken.balanceOf(user1.address)).to.eq(
          dropletAmount.mul(2)
        );
      });
    });

    describe("setParams", async () => {
      it("should allow the owner to update the faucet params", async () => {
        const dropletAmount = ethers.utils.parseEther("10");
        const claimInterval = 60 * 60 * 24 * 2; // 2 days
        await faucetToken
          .connect(owner)
          .setParams(dropletAmount, claimInterval);
        expect(await faucetToken.claimInterval()).to.eq(claimInterval);
        expect(await faucetToken.dropletAmount()).to.eq(dropletAmount);
      });

      it("should not allow non owners to update the params", async () => {
        const tx = faucetToken.connect(user1).setParams(1, 1);
        await expect(tx).to.be.reverted;
      });
    });
  });
});
