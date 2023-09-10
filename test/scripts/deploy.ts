import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const mintAmount = ethers.utils.parseEther("1000000");

  const TestERC20Token = await ethers.getContractFactory("TestERC20Token");
  const testERC20Token = await TestERC20Token.deploy(mintAmount);

  await testERC20Token.deployed();

  console.log(
    `TestERC20Token deployed to ${testERC20Token.address}`
  );

  const GenericContract = await ethers.getContractFactory("GenericContract");
  const genericContract = await GenericContract.deploy(testERC20Token.address);

  await genericContract.deployed();

  console.log(
    `GenericToken deployed to ${genericContract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
