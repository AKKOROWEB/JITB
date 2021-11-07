import Web3 from 'web3';
import {useEffect, useState, Component} from 'react';
import {connect} from 'react-redux';
import Image from 'next/image';
import {truncateAddress} from 'lib/moiWeb3';
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


function Gallery({address, chainId}) {
  const [loading, setLoading] = useState(true);
  const [nftCount, setNftCount] = useState(0);
  const [gallery, setGallery] = useState([]);
  async function getTokens() {
    const Contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
    await Contract.methods
      .totalSupply()
      .call()
      .then((res) => {
        let arr = [];
        setNftCount(res);
        for (let i = 1; i <= res; i++) {
          Contract.methods
            .tokenURI(i)
            .call()
            .then(async (res) => {
              if (res) {
                const data = await fetch(
                  res.replace('ipfs://', 'https://ipfs.io/ipfs/')
                )
                  .then(async (res) => await res.json())
                  .catch((err) => {
                    throw err;
                  });
                data['owner'] = await Contract.methods.ownerOf(i).call();
                data['tokenId'] = i;
                await arr.push(data);
                setGallery([...gallery, ...arr]);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .then(() => setLoading(false));
  }
  useEffect(() => {
    window.addEventListener('load', async () => {
      await getTokens();
    });
  }, []);
  return (
    <>
      {/* STYLING */}
      <style jsx>
        {`
          a {
            text-decoration: none;
          }
          .go-back {
            width:150px;
            right:5px;
            left:auto;
            baclground-color: #fff;
          }
        `}
      </style>
      {/* CONTENT */}
      <div
        className={`d-flex flex-column justify-content-center align-items-center mx-auto text-white`}>
        {/* GALLERY */}
        <h2 className={`text-center my-3 p-3`}>~ GALLERY ~</h2>
        {!loading ? (
          <>
            <p>{nftCount}/2978 Minted</p>
            <div className='d-flex flex-row flex-wrap justify-content-center'>
              {gallery.length > 0 ? (
                gallery
                  .sort((a, b) => a.tokenId - b.tokenId)
                  .map((item, index) => (
                    <a
                      key={index}
                      title='Click To Visit On Opensea'
                      href={`https://opensea.io/assets/${
                        process.env.CONTRACT_ADDRESS
                      }/${item.name.split('#')[1]}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white'>
                      <div className='gallery-img rounded text-center border border-white p-2 m-2'>
                        <div className={`gallery-image`}>
                          <Image
                            height={300}
                            width={300}
                            layout='fixed'
                            quality={100}
                            src={item.image}
                            alt={`gallery-item: ${item.name}`}
                          />
                        </div>
                        <div>{item.name}</div>
                        <div className='text-break'>
                          Owner: {truncateAddress(item.owner)}
                        </div>
                      </div>
                    </a>
                  ))
              ) : (
                <div />
              )}
            </div>
          </>
        ) : (
          <div className='spinner-border text-light' role='status'>
            <span className='sr-only'></span>
          </div>
        )}
        <a
          className={`go-back fixed-bottom btn btn-light text-uppercase my-4 px-5 py-3`}
          href={'/'}>
          Go Back
        </a>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  address: state.session.address,
  chainId: state.session.chainId,
});
export default connect(mapStateToProps, {})(Gallery);
