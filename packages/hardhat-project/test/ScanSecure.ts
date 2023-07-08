import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ScanSecure", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployInitFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, addr1] = await ethers.getSigners();

    const ScanSecure = await ethers.getContractFactory("ScanSecure");
    const scanSecure = await ScanSecure.deploy();

    return { scanSecure, owner, addr1 };
  }

  describe("Deployment", function () {
    it("Should set the right store", async function () {
      const { scanSecure } = await loadFixture(deployInitFixture);

      expect(await scanSecure.store()).to.equal(0);
    });

    it("Should set the right store increment", async function () {
      const { scanSecure } = await loadFixture(deployInitFixture);

      await scanSecure.setStore();

      expect(await scanSecure.store()).to.equal(1);
    });

  })

});
