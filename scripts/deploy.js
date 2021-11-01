// scripts/deploy_upgradeable_box.js
const {ethers, upgrades} = require('hardhat');

const config = {
  colectionName: 'testmnt',
  collectionSymbol: 'tmn',
  _publicMinting: false,
};
async function main() {
  const ERC721 = await ethers.getContractFactory('JACK_IN_THE_BLOCKS');
  const mc = await ERC721.deploy();

  await mc.deployed();
  // await mc.mint();
  console.log('NFT Collection deployed to:', mc.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
