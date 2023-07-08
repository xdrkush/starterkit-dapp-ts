import { getDefaultWallets, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { mainnet, sepolia, hardhat, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from '@wagmi/core/providers/infura'
import { createPublicClient, http } from "viem";
import { address, abi } from "./abis/scansecure";

import {
    ledgerWallet,
    argentWallet,
    trustWallet
} from '@rainbow-me/rainbowkit/wallets';

/*
 *  Config: Wagmi, Rainbowkit
 */

export const { chains, publicClient } = configureChains(
    [mainnet, sepolia, polygon, polygonMumbai, hardhat],
    [
        publicProvider(),
        infuraProvider({ apiKey: `${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}` })
    ]
);
const { wallets } = getDefaultWallets({
    appName: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_APPNAME}`,
    projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
    chains,
});
const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Others',
        wallets: [
            ledgerWallet({
                projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
                chains
            }),
            argentWallet({
                projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
                chains
            }),
            trustWallet({
                projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
                chains
            })
        ],
    },
])
export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
});

/*
 * Client viem
 */

const chain = () => {
    switch (process.env.NEXT_PUBLIC_CLIENT_CHAIN) {
        case "mainnet":
            return mainnet
        case "sepolia":
            return sepolia
        case "mumbai":
            return polygonMumbai

        default:
            return hardhat;
    }
}

export const client = createPublicClient({
    chain: chain(),
    transport: http(),
});

export const config = {
    chain: process.env.NEXT_PUBLIC_CLIENT_CHAIN,
    contracts: {
        scanSecure: {
            address, abi
        }
    }
}
