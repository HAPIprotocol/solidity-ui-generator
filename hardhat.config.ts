// @ts-ignore
const config = {
  solidity: {
    version: "0.8.21",
    paths: {
      sources: ["./test/contracts"],
      dependencies: ["node_modules/@openzeppelin/contracts"],
    },
  }

};

module.exports = config;
