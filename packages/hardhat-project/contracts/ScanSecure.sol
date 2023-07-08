// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ScanSecure is Ownable {
    // State
    uint public store;
    mapping(address => bool) whitelist;

    // Events
    event Whitelisted(address addr);

    // Modifier
    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "Vous devez etre inscrit");
        _;
    }

    // Functions
    function register() external {
        require(!whitelist[msg.sender], "Vous etes deja inscrit");
        whitelist[msg.sender] = true;

        emit Whitelisted(msg.sender);
    }
    function isWhitelisted(address _addr) external view returns (bool) {
        return whitelist[_addr];
    }
    
    function setStore() external onlyWhitelisted {
        store++;
    }
    function resetStore() external onlyOwner {
        store = 0;
    }

}
