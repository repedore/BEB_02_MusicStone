// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");

// import "@nomiclabs/hardhat-ethers";
// import "@nomiclabs/hardhat-waffle";
// import { getNamedAccounts, config } from "hardhat";
// import { HttpNetworkUserConfig } from "hardhat/src/types/config";
// import Caver from "caver-js";

const { ethers } = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  let Token = await ethers.getContractFactory("MusicStoneToken");
  let token = await Token.deploy();
  await token.deployed();

  let SFT = await ethers.getContractFactory("MusicStoneSFT");
  let sft = await SFT.deploy("");
  await sft.deployed();

  let Service = await ethers.getContractFactory("MusicStoneService");
  let service = await Service.deploy();
  await service.deployed();

  console.log(token.address);
  console.log(sft.address);
  console.log(service.address);

  await (await token.addMinter(service.address)).wait();
  await (await token.transferOwnership(service.address)).wait();
  await (await sft.addAuthorized(service.address)).wait();
  await (await service.setToken(token.address)).wait();
  await (await service.setSFT(sft.address)).wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
