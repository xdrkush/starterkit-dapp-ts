import { Props } from "@/types"
import { Navbar } from "../_global/navbar.main"
import { Grid, GridItem, Container } from "@chakra-ui/react"

export default function Main({ children }: Props) {
    return (
        <Grid
            templateAreas={`"nav" "main"`}
            gridTemplateRows={"60px 1fr"}
        >
            <GridItem area={"nav"}>
                <Navbar />
            </GridItem>

            <GridItem minH="80vh" area={"main"}>
                <Container as="main" maxW="container.lg" pt="5">
                    {children}
                </Container>
            </GridItem>
        </Grid>
    )
}
