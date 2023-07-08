import MainLayout from "@/components/layouts/Main.layout"
import { Box } from "@chakra-ui/react"
import Link from "next/link"

export default function Events() {
    return (
        <MainLayout>
            <div>Events</div>

            <Box>
                <Link href="/event/1">- Event 1</Link>
            </Box>
            <Box>
                <Link href="/event/2">- Event 2</Link>
            </Box>
            <Box>
                <Link href="/event/3">- Event 3</Link>
            </Box>
        </MainLayout>
    )
}
