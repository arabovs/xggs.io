import React from "react"
import { CryptoPriceBox } from "./crypto/CryptoPriceBox"
import { Grid, Paper, ThemeProvider, Typography } from "@material-ui/core"
import { pricingTheme } from "../themes/pricingTheme"

export const GridPrice = props => {
  return (
    <ThemeProvider theme={pricingTheme}>
      <Grid container spacing={1}>
        <Grid item sm={12} xs={12}>
          <Paper elevation={1}>
            <Typography>
              <CryptoPriceBox crypto_code={props.crypto_code} />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default GridPrice
