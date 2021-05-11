import React from "react"
import { PriceBox } from "./PriceBox"
import { Grid, Paper } from "@material-ui/core"

export const GridPrice = props => {
  return (
    <Grid container spacing={1}>
      <Grid item sm={2} xs={12}>
        <Paper>{props.crypto_code} Price </Paper>
      </Grid>
      <Grid item sm={3} xs={12}>
        <Paper>CoinMarketCap Price:</Paper>
      </Grid>
      <Grid item sm={7} xs={12}>
        <Paper>
          <PriceBox crypto_code={props.crypto_code} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default GridPrice
