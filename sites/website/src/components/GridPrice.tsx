import React from "react"
import { CryptoPriceBox } from "./crypto/CryptoPriceBox"
import { Grid, Paper } from "@material-ui/core"

export const GridPrice = props => {
  return (
    <Grid container spacing={1}>
      <Grid item sm={4} xs={12}>
        <Paper>{props.crypto_code} Price </Paper>
      </Grid>
      <Grid item sm={8} xs={12}>
        <Paper>
          <CryptoPriceBox crypto_code={props.crypto_code} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default GridPrice
