// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

library LibScanSecure {
    // Events
    event Whitelisted(address addr);

    struct Data {
        mapping(address => bool) whitelist;
        uint store;
    }

    /*////////////////////////////////////////////////////////////////////////////////////////////////
                                            STORAGE LOCATION
    ////////////////////////////////////////////////////////////////////////////////////////////////*/

    /// @dev Storage slot for Data struct
    bytes32 internal constant STORAGE_SLOT =
        keccak256("scansecure.contracts.storage.v1");

    /// @return data Data struct at `STORAGE_SLOT`
    function accessData() internal pure returns (Data storage data) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            data.slot := slot
        }
    }
}
