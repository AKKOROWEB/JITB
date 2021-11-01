// scripts/upgrade_box.js
require('dotenv').config();
const { ethers, upgrades } = require('hardhat');
const { API_URL, PRIVATE_KEY, POLYGON_KEY, CONTRACT_ADDRESS } = process.env;

async function main() {
  const NFTCollection = await ethers.getContractFactory("ERC721");
  console.log('Upgrading NFTCollection...', '0x11d152F3faE465BA76B4e8180D5a10E695f9f8ED');
  await upgrades.upgradeProxy('0x11d152F3faE465BA76B4e8180D5a10E695f9f8ED', NFTCollection);
  console.log('NFTCollection CONTRACT UPGRADED');
}

main().then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });