import React from "react"
import {
  Box,
  Grid,
  Paper,
  Container,
  ThemeProvider,
  Fade,
} from "@material-ui/core"
import { IndexPriceGrid } from "../components/index/IndexPriceGrid"
import { GridPrice } from "../components/GridPrice"
const client = require("../../../../packages/hasura/src/hasura/hasuraClient")
const { default: gql } = require("graphql-tag")

const Pricing = () => {
  const [shouldFade, setShouldFade] = React.useState(false)
  React.useEffect(() => {
    setShouldFade(true)
  }, [])

  return (
    <Container style={{ backgroundColor: "DodgerBlue" }}>
      <Box>
        <Fade in={shouldFade}>
          <Box>
            <Grid container spacing={1}>
              <Grid item sm={6} xs={12}>
                <GridPrice crypto_code="BTC" />
              </Grid>
            </Grid>
            <IndexPriceGrid />
          </Box>
        </Fade>
      </Box>
    </Container>
  )
}

export default Pricing
