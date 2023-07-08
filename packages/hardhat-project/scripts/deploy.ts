import { ethers } from "hardhat";

async function main() {
  const ScanSecure = await ethers.getContractFactory("ScanSecure");
  const scanSecure = await ScanSecure.deploy();

  await scanSecure.deployed();

  console.log(`ScanSecure deployed to ${scanSecure.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
