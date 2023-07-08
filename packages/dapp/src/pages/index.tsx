import Demo from "@/components/home/Demo"
import MainLayout from "@/components/layouts/Main.layout"
import { Grid } from "@chakra-ui/react"

export default function index() {
  return (
    <MainLayout>
      <Grid py={3} minH={"20vh"}>
        <Demo />
      </Grid>
    </MainLayout>
  )
}
