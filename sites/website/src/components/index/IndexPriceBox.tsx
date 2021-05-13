import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box, Grid } from "@material-ui/core"

export const IndexPriceBox = props => {
  const { data, loading, error } = useSubscription(
    gql`
      subscription IndexPriceSubscription() {
        index_price_updates(order_by: { created_at: desc }, limit: 1) {
          index_price
          index_btc_conversion
        }
      }
    `
  )

  console.log(data)

  console.log(error)
  console.log(data)
  console.log(data)

  if (loading) {
    return <Box>Loading</Box>
  }
  if (error) {
    return <Box>error</Box>
  }
  const indeces = ["FTSE100", "FTSE250", "FTSE350", "FTSEALL"]

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          {indeces}
        </Grid>
      </Grid>
    </Box>
  )
}
