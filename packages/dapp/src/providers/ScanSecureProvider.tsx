import { useMemo } from 'react';
import { ScanSecureContext } from "@/contexts"
import { useScanSecure } from "@/hooks/useScanSecure"
import { Props } from '@/types';

export default function ScanSecureProvider({ children }: Props) {
    // Hook
    const {
        contract, owner, store, whitelist, register,
        isWhitelisted, isOwner, contractIsConnected,
        getStore, incStore, resetStore
    } = useScanSecure()

    // Memory
    const values = useMemo(() => ({
        contract, owner, store, whitelist, register,
        isWhitelisted, isOwner, contractIsConnected,
        getStore, incStore, resetStore
    }), [
        contract, owner, store, whitelist, register,
        isWhitelisted, isOwner, contractIsConnected,
        getStore, incStore, resetStore
    ])

    return <ScanSecureContext.Provider value={values}>{children}</ScanSecureContext.Provider>;

}
