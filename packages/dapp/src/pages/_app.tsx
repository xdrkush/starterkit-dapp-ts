import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chains, wagmiConfig } from '@/config';
import { AppPropsWithLayout } from '@/types';

import "@rainbow-me/rainbowkit/styles.css";
import ScanSecureProvider from '../providers/ScanSecureProvider';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    // For load rainbowkit, ... only front
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), [])

    return (
        <ChakraProvider>
            {mounted && (
                <WagmiConfig config={wagmiConfig}>
                    <RainbowKitProvider chains={chains}>
                        <ScanSecureProvider>
                            {getLayout(<Component {...pageProps} />)}
                        </ScanSecureProvider>
                    </RainbowKitProvider>
                </WagmiConfig>
            )}
        </ChakraProvider>
    )
}
