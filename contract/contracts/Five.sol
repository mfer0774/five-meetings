// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Five is ERC721, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 42;
    uint256 private _currentSupply = 0;
    
    mapping (address => bool) public hasMinted;

    constructor() ERC721("Five", "FIVE") {}

    function mint() public payable nonReentrant {
        require(_currentSupply < MAX_SUPPLY, "Five: all gone.");
        require(hasMinted[msg.sender] == false, "Five: only one token per entity ");

        uint256 tokenId = _currentSupply + 1;

        // mint dat
        _safeMint(msg.sender, tokenId);
        
        // update supply
        _currentSupply = tokenId;
        
        // minter is minted
        hasMinted[msg.sender] = true;
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
