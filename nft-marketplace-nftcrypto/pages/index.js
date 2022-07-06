import {ethers} from 'ethers'
import { useEffect, useState} from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import { nftaddress, nftmarketaddress } from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import NFTCryptoMarket from '../artifacts/contracts/NFTCryptoMarket.sol/NFTCryptoMarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingstate, setLoadingState] = useState('not-loaded')

  useEffect(()=> {
    loadNFTs()
  }, [])

  async function loadNFTs(){
    //what we want to load:
    //***provide, tokenContract, marketContract, data for our marketItems***

    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, NFTCryptoMarket.abi, provider)
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      // we want to get the token in the metadata - json
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description
      }
      return item
    }))

    setNfts(items)
    setLoadingState('loaded')
  }

  //function to buy nfts for market

  async function buyNFT(nft){
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, NFTCryptoMarket.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')

    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })

    await transaction.wait()
    loadNFTs()
  }

  return (
    <div>
      {/* NFTCrypto MARKETPLACE */}
    </div>
  )
}
