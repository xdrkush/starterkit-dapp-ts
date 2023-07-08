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

let chain
const loadChain = () => {
    switch (process.env.NEXT_PUBLIC_CLIENT_CHAIN) {
        case "mainnet":
            chain = mainnet
            break;
        case "sepolia":
            chain = sepolia
            break;
        case "mumbai":
            chain = polygonMumbai
            break;

        default:
            chain = hardhat;
            break;
    }
}
loadChain()

// Client viem
export const client = createPublicClient({
    chain: chain,
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
