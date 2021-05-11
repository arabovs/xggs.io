import React from "react"
import { Box, Grid, Paper } from "@material-ui/core"
import { PriceBox } from "../components/PriceBox"
import { IndexBox } from "../components/IndexBox"
import { GridPrice } from "../components/GridPrice"

const Pricing = () => {
  return (
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
            <IndexBox crypto_base_code="BTC" index_code="FTSE100" />
          </Paper>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Paper>
            <IndexBox crypto_base_code="ETH" index_code="FTSE100" />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Paper>
            <IndexBox crypto_base_code="BTC" index_code="FTSE250" />
          </Paper>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Paper>
            <IndexBox crypto_base_code="ETH" index_code="FTSE250" />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Pricing
