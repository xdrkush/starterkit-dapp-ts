// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import { LibScanSecure } from "./common/LibScanSecure.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

/**
 * @title A simulator for
 * @author xDrKush
 * @notice You can use this contract for only the most basic simulation
 * @dev All function calls are currently implemented without side effects
 * @custom:experimental This is an experimental contract.
 */

contract ScanSecure is Ownable {
    // Modifier
    modifier onlyWhitelisted() {
        LibScanSecure.Data storage data = _data();
        require(_data().whitelist[msg.sender], "Vous devez etre inscrit");
        _;
    }

    // Functions
    function register() external {
        LibScanSecure.Data storage data = _data();
        require(!data.whitelist[msg.sender], "Vous etes deja inscrit");
        data.whitelist[msg.sender] = true;

        emit LibScanSecure.Whitelisted(msg.sender);
    }

    function isWhitelisted(address _addr) external view returns (bool) {
        LibScanSecure.Data storage data = _data();
        return data.whitelist[_addr];
    }

    function setStore() external onlyWhitelisted {
        LibScanSecure.Data storage data = _data();
        data.store++;
    }

    function getStore() external view returns (uint) {
        LibScanSecure.Data storage data = _data();
        return data.store;
    }

    function resetStore() external onlyOwner {
        LibScanSecure.Data storage data = _data();
        data.store = 0;
    }

    // Internal storage
    function _data() internal pure returns (LibScanSecure.Data storage) {
        return LibScanSecure.accessData();
    }
}
