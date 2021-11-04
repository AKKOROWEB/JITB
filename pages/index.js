import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Button from '../src/components/common/button';
var abi = [
  {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {indexed: false, internalType: 'bool', name: 'approved', type: 'bool'},
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: '_paused',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_price',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_reserved',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'owner', type: 'address'}],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'claimedToken',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'getApproved',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_address', type: 'address'}],
    name: 'getDiscountPrice',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPrice',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_to', type: 'address'},
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
    ],
    name: 'giveAway',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'address', name: 'operator', type: 'address'},
    ],
    name: 'isApprovedForAll',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint8', name: 'amount', type: 'uint8'}],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mint_toggle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintedFromReserve',
    outputs: [{internalType: 'uint16', name: '', type: 'uint16'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintedFromSupply',
    outputs: [{internalType: 'uint16', name: '', type: 'uint16'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintingSupply',
    outputs: [{internalType: 'uint16', name: '', type: 'uint16'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'ownerOf',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pre_mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'premint_paused',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'premint_toggle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {internalType: 'bytes', name: '_data', type: 'bytes'},
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'operator', type: 'address'},
      {internalType: 'bool', name: 'approved', type: 'bool'},
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'string', name: 'cid', type: 'string'}],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'bytes4', name: 'interfaceId', type: 'bytes4'}],
    name: 'supportsInterface',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'index', type: 'uint256'}],
    name: 'tokenByIndex',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'tokenURI',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_owner', type: 'address'}],
    name: 'walletOfOwner',
    outputs: [{internalType: 'uint256[]', name: '', type: 'uint256[]'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

function Home({address, chainId}) {
  const router = useRouter();
  const [claimedStatus, setClaimedStatus] = useState(false);
  const [MintStatus, setMintStatus] = useState(true);
  const [PreMintStatus, setPreMintStatus] = useState(true);
  const [_price, setPrice] = useState(60000000000000000);
  const [whitelist, setWhitelist] = useState(false);
  const [nftCount, setNftCount] = useState(0);
  const [num_to_mint, setNumToMint] = useState(0);
  const [error, setError] = useState('');
  const [redeem_error, setRedeemError] = useState('');
  async function mint(address, amount) {
    const Contract = new window.web3.eth.Contract(
      abi,
      process.env.CONTRACT_ADDRESS
    );
    const price = _price * amount;
    console.log(price);
    await Contract.methods
      .mint(amount)
      .estimateGas({from: address, value: price})
      .then((gasAmount) => {
        Contract.methods
          .mint(amount)
          .send({
            from: address,
            value: price,
            gas: String(Math.floor(gasAmount * 1.25, 10)),
          })
          .on('transactionHash', function (hash) {
            console.log('transactionHash', hash);
          })
          .catch(function (error) {
            if (error.message.includes('User denied transaction signature')) {
              setError('User denied transaction signature');
            }
            if (error.message.includes('err: insufficient funds')) {
              setError('Insufficient Funds');
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function pre_mint(address, amount) {
    const Contract = new window.web3.eth.Contract(
      abi,
      process.env.CONTRACT_ADDRESS
    );
    console.log(address, amount);
    await Contract.methods
      .pre_mint()
      .estimateGas({from: address, value: _price})
      .then((gasAmount) => {
        Contract.methods
          .pre_mint(amount)
          .send({
            from: address,
            value: _price,
            gas: String(Math.floor(gasAmount * 1.25, 10)),
          })
          .on('transactionHash', function (hash) {
            console.log('transactionHash', hash);
          })
          .catch(function (error) {
            if (error.message.includes('User denied transaction signature')) {
              setError('User denied transaction signature');
            }
            if (error.message.includes('err: insufficient funds')) {
              setError('Insufficient Funds');
            }
          });
      })
      .catch((error) => {
        if (error.message.includes('User denied transaction signature')) {
          setError('User denied transaction signature');
        } else {
          setError(error.message);
        }
      });
  }

  async function getTokensCount() {
    const Contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
    await Contract.methods
      .totalSupply()
      .call()
      .then((res) => {
        setNftCount(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getWhiteList(address) {
    const Contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
    await Contract.methods
      .whitelisted(address)
      .call()
      .then((res) => {
        setWhitelist(res);
      });
  }
  async function getClaimed(address) {
    const Contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
    await Contract.methods
      .claimedToken(address)
      .call()
      .then((res) => {
        setClaimedStatus(res);
      });
  }
  async function getPreMintStatus() {
    const Contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
    await Contract.methods
      .premint_paused()
      .call()
      .then((res) => {
        setPreMintStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getMintStatus() {
    const Contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
    await Contract.methods
      ._paused()
      .call()
      .then((res) => {
        setMintStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getPrice(address) {
    const Contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
    return await Contract.methods
      .getDiscountPrice(address)
      .call()
      .then((res) => {
        console.log(res);
        setPrice(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    window.addEventListener('load', async () => {
      await getTokensCount();
      await getPreMintStatus();
      await getMintStatus();
      await getPrice(address);
      await getClaimed(address);
    });
  }, []);
  return (
    <>
      {/* STYLING */}
      <style global jsx>
        {`
          p {
            font-size: 1.25rem;
          }
          .punk-font {
            font-size: 2rem;
          }
          .Punks-Evolved-container {
            min-height: 37.5rem;
            background: url('../Banner 2 reduced.jpg') no-repeat top center;
            background-size: cover;
          }
          .roadmap {
            width: 100%;
            max-width: 50rem;
          }
          .stay-involved {
            height: 100%;
            height: 43.75rem;
            background: url('../Web Banner 1 reduced.jpg') no-repeat center
              center;
            background-size: cover;
          }
          .stay-involved p {
            font-size: 1.5rem;
          }
          .socials {
            min-height: 500px;
          }
          .jitb-style-btn {
            height: 75px;
            font-size: 1.5rem;
            width: 300px;
            text-align: center;
            justify-content: center;
          }
          .progress {
            max-width: 50rem;
            width: 100%;
            margin: 0 auto;
          }
          .mint-input {
            z-index: 2;
            background-color: rgba(0, 0, 0, 0.25);
          }
          .mint-section-icons {
            z-index: 2;
            padding: 3px 1rem;
          }
          .header-section {
            height: 100%;
            max-height: 1200px;
            min-height: 1000px;
            background: url('../bg.png') no-repeat top center;
            background-size: cover;
          }
          .logo {
            height: 100%;
            min-height: 400px;
            max-height: 800px;
            left: 0;
          }
          .zin-1 {
            z-index: 1;
          }
          .js-font {
            min-width: 300px;
            max-height: 800px;
            z-index: 2;
          }
          .js-font img {
            font-family: 'Baskerville Old Face' !important;
            color: #ad0000;
            // font-size: 2rem;
            text-align: center;
          }
          .preview-gif {
            max-height: 300px;
            max-width: 300px;
          }
          .logo img {
            object-fit: cover;
          }
          svg {
            width: 32px;
            height: 32px;
            color: #fff;
            margin: 5px;
          }
          .collage-img {
            min-height: 360px;
            min-width: 360px;
            max-width: 1200px;
          }
          .nft-percent {
            z-index: 5;
            // padding-left: 1rem;
            color: #000;
            background-color: transparent;
          }
          .bg-blood {
            background-color: #ad0000;
          }

          @media screen and (max-width: 1000px) {
            .mint-section-box,
            .header-section,
            .logo-xl {
              height: 100%;
              min-height: 800px;
              max-height: 1200px;
            }
          }
          @media screen and (max-width: 800px) {
            .mint-section-box,
            .header-section,
            .logo-xl {
              height: 100%;
              min-height: 600px;
              max-height: 1200px;
            }
            .header-section {
              background: url('../Mobile Banner minting top.png') no-repeat top
                center;
              background-size: cover;
            }
            p {
              font-size: 1.15rem;
            }
          }
        `}
      </style>
      <div
        className={`d-flex flex-column justify-content-center mx-auto text-white`}>
        {/* HEADER */}
        <div
          className={`header-section d-flex flex-column justify-content-center
            align-itens-center h-100 w-100`}>
          <div
            className={`js-font d-flex flex-column align-items-center justify-content-center col col-md-6 px-3`}>
            <img
              src='/Jack In The Blocks Title_Interactive LightMix.png'
              className={`h-100 w-100`}
              alt=''
            />
            {!MintStatus && nftCount <= 2978 && (
              <div className='container mint-input d-flex flex-column justify-content-center align-items-center p-3 border border-dark w-100 my-4'>
                <div className={`d-flex flex-column justify-content-between`}>
                  <label htmlFor='minter-input' className={`h4 py-3 w-100`}>
                    Minting: {num_to_mint}
                    <br />
                    Price: ~ {String(num_to_mint * (_price / 10e17))} ETH
                  </label>
                  <input
                    id={`minter-input`}
                    type={`range`}
                    min={0}
                    max={5}
                    className={`w-100`}
                    value={num_to_mint}
                    onChange={(e) => {
                      parseInt(e.target.value, 10) >= 0 &&
                        parseInt(e.target.value, 10) <= 5 &&
                        setNumToMint(e.target.value);
                    }}
                  />

                  <p>{error}</p>
                </div>
                <Button
                  buttonStyle={`mint-button-style btn-outline-light text-uppercase my-4 px-5`}
                  onPress={async () => {
                    if (num_to_mint > 0 && nftCount <= 2978)
                      mint(address, num_to_mint);
                  }}>
                  Mint
                </Button>
                <p>{error}</p>
              </div>
            )}
            {parseInt(_price) < 60000000000000000 &&
              !claimedStatus &&
              !PreMintStatus &&
              nftCount <= 2978 && (
                <div className='container mint-input d-flex flex-column justify-content-center align-items-center p-3 border border-dark w-100 my-4'>
                  <Button
                    buttonStyle={`mint-button-style btn-outline-light text-uppercase my-4 px-5`}
                    onPress={async () => {
                      if (nftCount < 2978) pre_mint(address, num_to_mint);
                    }}>
                    Presale Mint
                  </Button>
                  <p className={`text-center`}>{error}</p>
                </div>
              )}
            <div className='container d-flex flex-column justify-content-center align-items-center p-3 border border-dark w-100 my-4'>
              <p>{nftCount}/2978 Minted</p>
              <div className='progress position-relative mb-3'>
                <span className='nft-percent position-absolute top-50 start-50 translate-middle'>
                  {((nftCount / 2978) * 100).toFixed(2)}%
                </span>
                <div
                  style={{width: `${(nftCount / 2978) * 100}%`}}
                  className='progress-bar bg-blood'
                  role='progressbar'
                  aria-valuenow={`${nftCount}`}
                  aria-valuemin='0'
                  aria-valuemax='2988'></div>
              </div>
            </div>
          </div>
        </div>
        {/* MINT SECTION */}

        {/* PROFILE INFO */}
        <div
          className={`container d-flex flex-column justify-content-center
            align-itens-center px-3  px-md-5 py-5 roadmap mx-auto`}>
          <h1 className={`text-center punk-font mb-5`}>About Jacks</h1>
          <p>
            Jack In the Blocks is the first value added project to Evolved Punks
            and was painstakingly crafted in 3D with over 100 unique assets.
            Created professionally in 3D, Jack In the Blocks strived to create
            the utmost quality in all aspects. The first project to showcase and
            drive the 3D generative tech Punks Evolved was founded on and
            promised in future projects all part of the families ecosystem, it
            is not only a phenomenal NFT collection, but also the first to
            utilize and implement Punks Evolved’s value added incentives.
          </p>

          <p>
            With 2,978 Jacks available, it is a limited collection focused on
            quality, not quantity and every Jack is a statement piece. 14 Unique
            one of one Jacks are strewn about the collection, some with
            immediate and incredible rewards – congratulations in advance to
            whoever is lucky enough to pull these one of ones.
          </p>

          <p>
            Punks Evolved will be halted at 1,000 mints, and owning a punk
            before launch guarantees you to be whitelisted to the presale, as
            well as receive a discount upon minting for owning quantities of
            either 1, 4 or 7 Punks Evolved. Jack In the Blocks is the showcase
            that promises on the quality we promised with Punks for our
            dedication to 3D generative NFTs, which we firmly believe is an
            inevitable future in both the NFT realm, and asset generation as a
            whole.
          </p>

          <p>
            Thank you for both your support in Punks Evolved and Jack In The
            Blocks, and we couldn’t be more excited to have you a part of our
            family of projects, all which will work in tandem with one another
            to provide consistent value, and quality projects for all our
            community members who believe in them.
          </p>
        </div>
        {/* ROADMAP */}
        <div
          className={`container  d-flex flex-column justify-content-center
            align-itens-center px-3  px-md-5 py-5`}>
          <img
            src={'./RoadMap_Interactive LightMix.png'}
            alt='roadmap'
            className='img-fluid mb-5'
          />
          <img
            className={`text-center roadmap mx-auto mb-5`}
            src={'./RoadMap_Chart.png'}
          />
        </div>
        {/* Punks Evolved */}
        <div
          className={`container-fluid Punks-Evolved-container d-flex flex-column justify-content-center
            align-itens-center px-3 px-md-5 py-5`}>
          <div className={`d-flex flex-column  col-md-6 `}>
            <h1 className={`punk-font mb-5`}>Punks Evolved?</h1>
            <p>
              The first project in our ecosystem and the backbone to Jacks and
              what’s to come. Owning a Punks Evolved will grant you whitelist
              privileges as well as discounts to every project under our
              umbrella.
            </p>
            <p>Owning 1 Punk = 0.055 Mint For Jack In The Blocks</p>
            <p>Owning 4 Punks = 0.050 Mint For Jack In The Blocks</p>
            <p>Owning 7 Punks = 0.045 Mint For Jack In The Blocks</p>
            <div
              className={`d-flex flex-column flex-md-row justify-content-start align-items-center`}>
              <a
                className={`jitb-style-btn d-flex flex-row align-items-center btn btn-light text-uppercase my-4 m-2 p-4`}
                href={'https://punksevolved.io/'}>
                Mint a Punk
              </a>
              <a
                className={`jitb-style-btn d-flex flex-row align-items-center btn btn-light text-uppercase my-4 m-2 p-4`}
                href={'https://opensea.io/collection/evolvedpunks'}>
                Opensea
              </a>
            </div>
          </div>
        </div>
        {/* FAQ */}
        <div
          className={`container d-flex flex-column justify-content-center
            align-itens-center px-3  px-md-5 py-5 text-capitalize`}>
          <img
            src={'./FAQ_Interactive LightMix.png'}
            alt='roadmap'
            className='img-fluid mb-5'
          />
          <div className={`d-flex flex-column roadmap mx-auto`}>
            <p>
              <strong>How can I purchase a Jack?</strong>
            </p>
            <p>
              Connect your wallet to the website and select the amount you wish
              to mint, we’ve limited it to 5 at a time to avoid bot attacks when
              possible – once you’ve entered the amount, hit mint and approve in
              Metamask and it’s as simple as that!
            </p>

            <p>
              <strong>How much does a punk cost?</strong>
            </p>

            <p>The baseline minting cost of Jack In The Blocks is 0.06 ETH</p>

            <p>
              Owning 1 Punks Evolved = 0.055 Mint
              <br />
              Owning 4 Punks Evolved = 0.050 Mint <br />
              Owning 7 Punks Evolved = 0.045 Mint{' '}
            </p>

            <p>
              <strong>What Framework Are Jack In The Blocks built on?</strong>
            </p>
            <p>Jack In The Blocks are built on the ERC-721 standard</p>

            <p>
              <strong>Where can I view my newly minted Jack?</strong>
            </p>
            <p>
              You can view your Jack on Opensea.io or any compatible NFT viewing
              metric– We will provide a link to Opensea and from there navigate
              to view “My Profile”
            </p>

            <p>
              <strong>Is every Jack truly unique?</strong>
            </p>
            <p>
              Yes! We’ve ensured there will be no duplicate Jacks, and all will
              be 100% unique combinations
            </p>

            <p>
              <strong>Who can I contact if I have a problem?</strong>
            </p>

            <p>
              You can contact any of our administrators in our Discord if you
              run into any issues! We’re always here to help
            </p>
          </div>
        </div>
        {/* STAY INVOLVED */}
        <div
          className={`container-fluid stay-involved d-flex flex-column justify-content-center
            align-itens-center px-3  px-md-5 py-5`}>
          <div className={`d-flex flex-column col-md-6`}>
            <h3 className={`punk-font mb-5`}>Stay Involved</h3>
            <p>
              Community is everything in NFTs and we’d love to have you as part
              of ours! Join our Discords to stay up to date with both projects!
            </p>
            <a
              className={`jitb-style-btn d-flex flex-row align-items-center btn btn-light text-uppercase my-4 p-4`}
              href={'http://discord.gg/c73a3danSJ'}>
              Join Discord
            </a>
          </div>
        </div>
        {/* SOCIALS*/}
        <div
          className={`container-fluid socials d-flex flex-column justify-content-center
            align-itens-center px-3  px-md-5 py-5`}>
          <div
            className={`d-flex flex-column flex-md-row justify-content-around align-items-center`}>
            <a
              className={`jitb-style-btn d-flex flex-row align-items-center btn btn-light text-uppercase my-4 mx-2 p-4`}
              href={'https://opensea.io/collection/jackintheblocks'}>
              Opensea
            </a>
            <a
              className={`jitb-style-btn d-flex flex-row align-items-center btn btn-light text-uppercase my-4 mx-2 p-4`}
              href={'https://punksevolved.io/'}>
              Punks Evolved
            </a>
            <a
              className={`jitb-style-btn d-flex flex-row align-items-center btn btn-light text-uppercase my-4 mx-2 p-4`}
              href={'https://twitter.com/JacksInTheBlock'}>
              Twitter
            </a>
          </div>
        </div>
        <div className={`d-flex flex-row justify-content-start px-4`}>
          <p className={`m-0`}>© COPYRIGHT JACK IN BLOCKS 2021</p>
        </div>
      </div>
      <hr className={`container`} />
    </>
  );
}
const mapStateToProps = (state) => ({
  address: state.session.address,
  chainId: state.session.chainId,
});
export default connect(mapStateToProps, {})(Home);
