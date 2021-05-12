import React from "react"
import { Box, Grid, Paper, Container, ThemeProvider } from "@material-ui/core"
import { IndexPriceBox } from "../components/index/IndexPriceBox"
import { GridPrice } from "../components/GridPrice"

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
              <GridPrice crypto_code="ETH" />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item sm={6} xs={12}>
            <Paper>
              <IndexPriceBox source="LSE" index_code="FTSE100" />
            </Paper>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Paper>
              <IndexPriceBox source="LSE" index_code="FTSE250" />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Pricing
