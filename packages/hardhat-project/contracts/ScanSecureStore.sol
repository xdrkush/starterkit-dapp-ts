// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

// Library
import "@openzeppelin/contracts/access/Ownable.sol";
import { LibScanSecure } from "./libs/LibScanSecure.sol";

abstract contract ScanSecureStore is Ownable {
    // Modifier
    modifier onlyWhitelisted() {
        LibScanSecure.Data storage data = _data();
        require(_data().whitelist[msg.sender], "Vous devez etre inscrit");
        _;
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
    function _data() internal pure virtual returns (LibScanSecure.Data storage) {
        return LibScanSecure.accessData();
    }
}