require("@nomiclabs/hardhat-waffle");
const projectId = '9713cba385f14dc58656ac8f3ab4a667'
const fs = require('fs')
const keyData = fs.readFileSync('./p-key.txt',{
  encoding:'utf8', flag:'r'
})


module.exports = {
  defaultNetwork: 'hardhat',
  networks:{
    hardhat:{
      chainId: 1337 //config standard
    },
    mumbai:{
      url:`https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts:[keyData]
    },
    mainnet: {
      url:`https://mainnet.infura.io/v3/${projectId}`,
      accounts:[keyData]
    }
  },
  solidity: {
    version: "0.8.4",
    settings:{
      enabled: true,
      runs: 200
    }
  }
};
