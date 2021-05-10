import React from "react"
import { useSubscription, gql, fromPromise } from "@apollo/client"
import { Box, Grid } from "@material-ui/core"
import { PriceBox } from "../components/PriceBox"
import { IndexBox } from "../components/IndexBox"

const Pricing = () => {
  return (
    <Box>
      <PriceBox crypto_code="BTC" />
      <PriceBox crypto_code="ETH" />
      <IndexBox index_code="FTSE100" />
    </Box>
  )
}

export default Pricing
