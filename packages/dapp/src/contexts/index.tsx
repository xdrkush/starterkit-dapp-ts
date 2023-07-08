import { createContext } from "react";

type ScanSecureContextType = {
    // State
    contract: Object | undefined
    owner: string | undefined
    store: number | undefined
    whitelist: object[] | undefined
    contractIsConnected: boolean | undefined
    isOwner: boolean | undefined
    isWhitelisted: boolean | undefined

    // Function
    register: () => void
    getStore: () => void
    incStore: () => void
    resetStore: () => void
}

export const ScanSecureContext = createContext<ScanSecureContextType>({
    contract: {},
    owner: "",
    store: 0,
    whitelist: [],
    contractIsConnected: false,
    isOwner: false,
    isWhitelisted: false,
    
    register: () => { },
    getStore: () => { },
    incStore: () => { },
    resetStore: () => { },
})
