import React from "react"
import { Box, Grid, Paper, Container, ThemeProvider } from "@material-ui/core"
import { IndexPriceBox } from "../components/index/IndexPriceBox"
import { GridPrice } from "../components/GridPrice"
const client = require("../../../../packages/hasura/src/hasura/hasuraClient")
const { default: gql } = require("graphql-tag")

const Pricing = () => {
  return (
    <Container style={{ backgroundColor: "DodgerBlue" }}>
      <Box>
        <Grid container spacing={1}>
          <Grid item sm={6} xs={12}>
            <GridPrice crypto_code="BTC" />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Paper>
              <GridPrice crypto_code="BTC" />
            </Paper>
          </Grid>
          <IndexPriceBox />
        </Grid>
      </Box>
    </Container>
  )
}

export default Pricing
