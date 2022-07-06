require("@nomiclabs/hardhat-waffle")
const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
const projectID = "9713cba385f14dc58656ac8f3ab4a667"

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
  mumbai: {
   url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
   accounts: [privateKey]
 },
 mainnet: {
  url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
  accounts: [privateKey]
 }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
