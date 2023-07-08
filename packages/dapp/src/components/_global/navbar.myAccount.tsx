import {
    Box, Flex,
    useColorModeValue,
    Breadcrumb,
    BreadcrumbItem,
} from "@chakra-ui/react"
import Link from 'next/link'
import { ColorModeSwitcher } from "@/components/ColorSwitcher"
import ButtonProfile from "./ButtonProfile";

export function Navbar({ isOpen }: any) {

    return (
        <Box>
            <Flex
                w={"100%"}
                position="fixed"
                zIndex="10"
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.100", "primary.100")}
                align={"center"}
            >
                {/* HOME LINK */}
                <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
                    <Box
                        display="flex"
                        color={useColorModeValue("gray.800", "white")}
                        fontSize={"lg"}
                        _hover={{
                            textDecoration: "none",
                            color: useColorModeValue("gray.800", "white"),
                        }}
                        fontWeight="bold"
                    >
                        <Link href="/">
                            ScanSecure
                        </Link>
                    </Box>
                </Flex>

                <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
                    <Box
                        display="flex"
                        color={useColorModeValue("gray.800", "white")}
                        fontSize={"lg"}
                        _hover={{
                            textDecoration: "none",
                            color: useColorModeValue("gray.800", "white"),
                        }}
                    >
                        Profile
                    </Box>
                </Flex>

                <Breadcrumb separator='-'>
                    <BreadcrumbItem>
                        <Link href="/events">
                            Events
                        </Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <Link href="/tickets">
                            Tickets
                        </Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>

                        <Link href="/contact">
                            Contact
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumb>

                {/* COLOR MODE */}
                <Box px={1}>
                    <ColorModeSwitcher justifySelf="flex-end" />
                </Box>

                <Box px={1}>
                    <ButtonProfile />
                </Box>

            </Flex>
        </Box>
    )
}
