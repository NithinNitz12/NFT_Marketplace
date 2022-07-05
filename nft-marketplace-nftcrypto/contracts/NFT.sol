//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//openzepplin ERC721 NFT functionality
import '../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '../../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '../../node_modules/@openzeppelin/contracts/utils/Counters.sol';

contract NFT is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    //counters allow us to keep track of tokenIds
    //address of marketplace for NFTs to interact
    address contractAddress;

    constructor(address marketplaceAddress) ERC721('NFTCrypto','NFTC'){
        contractAddress = marketplaceAddress;
    }
    function mintToken(string memory tokenURI) public returns(uint){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        
        return newItemId;
    }
}