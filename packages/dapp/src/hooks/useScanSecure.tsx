import { useState, useEffect } from 'react';

import { getContract, prepareWriteContract, writeContract, readContract, waitForTransaction } from '@wagmi/core'
import { useAccount, useContractEvent, useNetwork } from "wagmi"
import { parseAbiItem, getAddress } from 'viem'

import { useNotif } from './useNotif';
import { config, client } from "@/config"
import { confetti } from '@/utils';

export function useScanSecure() {
    const { isConnected, address } = useAccount()
    const { chain } = useNetwork()
    const { setNotif } = useNotif()

    // init state
    const [contract, setContract] = useState<any>();
    const [contractIsConnected, setContractIsConnected] = useState<boolean>();
    const [owner, setOwner] = useState<string>("");

    const [isWhitelisted, setIsWhitelisted] = useState<boolean>();
    const [isOwner, setIsOwner] = useState<boolean>();

    const [store, setStore] = useState<number>();
    const [whitelist, setWhitelist] = useState<object[]>();

    // Load contract
    const loadContract = async () => {
        try {
            // const walletClient = await getWalletClient()
            const c = getContract({
                address: getAddress(config.contracts.scanSecure.address),
                abi: config.contracts.scanSecure.abi
            })

            console.log('loadContract', c, await c.read.owner())
            const owner = await c.read.owner() ? String(await c.read.owner()) : null
            const store = await c.read.store() ? Number(await c.read.store()) : null

            // // Set state hook
            if (!owner) return
            setContract(c)
            setOwner(getAddress(owner))
            setStore(Number(store))

            setContractIsConnected(true)
        } catch (error) {
            console.log('error use effect')
            setNotif({ type: "error", message: "Impossible de se connecter au contrat, êtes vous sur le bon réseaux ?" })
            setContractIsConnected(false)
        }
    }
    useEffect(() => {
        if (!isConnected) return;
        try {
            loadContract()
        } catch (error) {
            console.log(error)
        }
    }, [isConnected, address, chain?.id])

    // Roles
    const checkRoles = async () => {
        // IsOwner
        try {
            if (!address) return;
            setIsOwner(address === getAddress(await contract.read.owner()))
        } catch (error) {
            setNotif({ type: "error", message: String(error) })
        }

        // IsWhitelisted
        try {
            if (!address) return;
            const data = await readContract({
                address: getAddress(config.contracts.scanSecure.address),
                abi: config.contracts.scanSecure.abi,
                functionName: 'isWhitelisted',
                args: [getAddress(address)]
            })
            setIsWhitelisted(data)
        } catch (error) {
            setNotif({ type: "error", message: String(error) })
        }
    }
    useEffect(() => {
        if (!contractIsConnected) return;
        checkRoles()
    }, [contract])

    // Functions
    const register = async () => {
        try {
            const { request } = await prepareWriteContract({
                address: getAddress(config.contracts.scanSecure.address),
                abi: config.contracts.scanSecure.abi,
                functionName: 'register'
            })
            await transactionsCompleted(request)
            await checkRoles()
        } catch (error) {
            setNotif({ type: "error", message: String(error) })
        }
    }

    const incStore = async () => {
        if (!isWhitelisted) return;
        try {
            const { request } = await prepareWriteContract({
                address: getAddress(config.contracts.scanSecure.address),
                abi: config.contracts.scanSecure.abi,
                functionName: 'setStore'
            })
            await transactionsCompleted(request)
            getStore()
        } catch (error) {
            setNotif({ type: "error", message: String(error) })
        }
    }

    const getStore = async () => {
        try {
            const store = await contract.read.store()
            setStore(store)
            return store
        } catch (error) {
            setNotif({ type: "error", message: String(error) })
        }
    }

    const resetStore = async () => {
        try {
            if (!isOwner) return;
            const { request } = await prepareWriteContract({
                address: getAddress(config.contracts.scanSecure.address),
                abi: config.contracts.scanSecure.abi,
                functionName: 'resetStore'
            })
            await transactionsCompleted(request)
            getStore()
        } catch (error) {
            setNotif({ type: "error", message: String(error) })
        }
    }

    const transactionsCompleted = async (_request: any) => {    
        const { hash } = await writeContract(_request)
        setNotif({type: 'info', message: "Transactions Processing..."})
        const data = await waitForTransaction({
            hash: hash,
        })
        setNotif({type: 'info', message: "Transactions effectué !"})
        confetti(0)
        return data
    }

    // Events watcher
    useContractEvent({
        address: getAddress(config.contracts.scanSecure.address),
        abi: config.contracts.scanSecure.abi,
        eventName: 'Whitelisted',
        listener(log) {
            console.log('event1', address, String(log[0].args.addr))
            console.log('event1', whitelist, String(address) === String(log[0].args.addr))
            if (String(address) === String(log[0].args.addr)) {
                setNotif({ type: 'info', message: 'Vous êtes Whitelisted' })
                checkRoles()
            }
            setNotif({ type: 'info', message: String(log[0].args.addr) })
            if (!whitelist) return;
            setWhitelist([...whitelist, { id: whitelist.length, address: String(log[0].args.addr) }])
        }
    })

    // Events logs
    const getWhitelisted = async () => {
        const fromBlock = BigInt(Number(await client.getBlockNumber()) - 15000)

        const whitelistedLogs = await client.getLogs({
            address: getAddress(config.contracts.scanSecure.address),
            event: parseAbiItem(
                "event Whitelisted(address addr)"
            ),
            fromBlock: Number(fromBlock) >= 0 ? fromBlock : BigInt(0),
        });

        const whitelist = (await Promise.all(whitelistedLogs.map(async (log, i) => {
            return { id: Number(i + 1), address: String(log.args.addr) };
        }))).map(w => w)

        setWhitelist(whitelist)
    }

    useEffect(() => {
        if (!contractIsConnected) return;
        getWhitelisted()
    }, [contract])

    // export from hook
    return {
        contract, owner, store, whitelist, register,
        isWhitelisted, isOwner, contractIsConnected,
        getStore, incStore, resetStore
    }
}
