// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

// Library
import { LibScanSecure } from "./libs/LibScanSecure.sol";

abstract contract ScanSecureAccess {
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

    // Internal storage
    function _data() internal pure virtual returns (LibScanSecure.Data storage) {
        return LibScanSecure.accessData();
    }
}