import {
    Button, Menu, MenuButton,
    MenuList, MenuGroup, MenuDivider,
    MenuItem,
} from "@chakra-ui/react"
import Link from 'next/link'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';

export default function ButtonProfile() {
    const { isConnected } = useAccount()
    return (
        <>
            {!isConnected ? (
                <Menu>
                    <ConnectButton
                        accountStatus={{
                            smallScreen: "avatar",
                            largeScreen: "full",
                        }}
                        chainStatus={{
                            smallScreen: "none",
                            largeScreen: "full",
                        }}
                    />
                </Menu>
            ) : (
                <Menu>

                    <MenuButton as={Button}>
                        Profile
                    </MenuButton>
                    <MenuList px={2}>
                        <ConnectButton
                            accountStatus={{
                                smallScreen: "avatar",
                                largeScreen: "full",
                            }}
                            chainStatus={{
                                smallScreen: "none",
                                largeScreen: "full",
                            }}
                        />

                        <MenuGroup title='Profile'>
                            <Link href="/myAccount"><MenuItem>My Account</MenuItem></Link>
                        </MenuGroup>

                        <MenuDivider />

                        <MenuGroup title='Admin'>
                            <Link href="/admin"><MenuItem>Dashboard</MenuItem></Link>
                        </MenuGroup>

                    </MenuList>
                </Menu>
            )}
        </>
    )
}
