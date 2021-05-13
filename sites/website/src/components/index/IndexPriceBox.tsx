import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box, Grid } from "@material-ui/core"

export const IndexPriceBox = props => {
  const { data, loading, error } = useSubscription(
    gql`
      subscription IndexPriceSubscription(
        $source: String!
        $index_code: String!
      ) {
        index_price_updates(
          where: { index_code: { _eq: $index_code } }
          order_by: { created_at: desc }
          limit: 1
        ) {
          index_price
          index_btc_conversion
        }
      }
    `,
    {
      variables: {
        index_code: props.index_code,
      },
    }
  )

  if (loading) {
    return <Box>loading</Box>
  }
  if (error) {
    return <Box>error</Box>
  }
  const indeces = ["FTSE100", "FTSE250", "FTSE350"]
  console.log(data)

  return (
    <Box>
      <Grid container spacing={1}>
        {indeces}
      </Grid>
    </Box>
  )
}
