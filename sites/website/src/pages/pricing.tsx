import React from "react"
import { Box, Grid, Paper } from "@material-ui/core"
import { PriceBox } from "../components/PriceBox"
import { IndexBox } from "../components/IndexBox"

const Pricing = () => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12} style={{ height: "100%" }}>
          <Paper>
            <PriceBox crypto_code="BTC" />
          </Paper>
        </Grid>
        <Grid item sm={6} xs={12} style={{ height: "100%" }}>
          <Paper>
            <PriceBox crypto_code="ETH" />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12} style={{ height: "100%" }}>
          <Paper>
            <IndexBox crypto_base_code="BTC" />
          </Paper>
        </Grid>
        <Grid item sm={6} xs={12} style={{ height: "100%" }}>
          <Paper>
            <IndexBox crypto_base_code="ETH" />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Pricing
