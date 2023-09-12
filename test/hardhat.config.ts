import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config = {
  solidity: {
    version: "0.8.21",
    paths: {
      sources: ["contracts"],
      dependencies: ["node_modules/@openzeppelin/contracts"],
    },
  }

};

export default config;
