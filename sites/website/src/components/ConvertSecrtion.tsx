import React from "react"
import { CryptoPriceBox } from "./crypto/CryptoPriceBox"
import { Box, Grid, Paper, ThemeProvider, Typography } from "@material-ui/core"
import { pricingTheme } from "../themes/pricingTheme"
import { getIndexPricesLatestSubscription } from "../../../../packages/hasura/src/hasura/hasuraClient"

export const GridPrice = props => {
  const data = getIndexPricesLatestSubscription("LSE")

  return <Box></Box>
}

export default GridPrice
