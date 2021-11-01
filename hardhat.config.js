/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');

const { API_URL, PRIVATE_KEY, POLYGON_KEY, WALLET_ADDRESS, ETHERSCAN_API } = process.env;
module.exports = {
  solidity: "0.8.0",
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  defaultNetwork: "matic",
  networks: {
    hardhat: {
      chainId: 137
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/' + POLYGON_KEY,
      // url: 'https://polygon-mainnet.g.alchemy.com/v2/5XVWv4P5pthhxbxWAeqgRJ-QpIU9C2uv',
      accounts: [`0x${PRIVATE_KEY}`],
    },
    matic: {
      url: 'https://polygon-mainnet.infura.io/v3/' + POLYGON_KEY,
      // url: 'https://polygon-mainnet.g.alchemy.com/v2/5XVWv4P5pthhxbxWAeqgRJ-QpIU9C2uv',
      accounts: [`0x${PRIVATE_KEY}`],
      // gas: 2100000,
      gasPrice: 8000000000
    },
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/' + POLYGON_KEY,
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 8000000000
    }
  },

}