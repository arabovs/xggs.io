import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box, Grid } from "@material-ui/core"

export const IndexPriceBox = props => {
  /**const data2 = getCryptoLatestPrice({
    objects: { source: "CMC", crypto_code: "BTC" },
  })**/
  const { data, loading, error } = useSubscription(
    gql`
      subscription IndexPriceSubscription(
        $source: String!
        $index_code: String!
      ) {
        index_price_updates(
          where: { source: { _eq: $source }, index_code: { _eq: $index_code } }
          order_by: { created_at: desc }
          limit: 1
        ) {
          index_price
        }
      }
    `,
    {
      variables: {
        source: props.source,
        index_code: props.index_code,
      },
    }
  )
  if (loading) {
    return <Box>Loading</Box>
  }
  if (error) {
    console.log(error)
    return <Box>Error</Box>
  }
  console.log(data)
  const calculated = data.index_price_updates[0].index_price / 1000
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Box>
            {props.index_code}
            {": "}
            {data.index_price_updates[0].index_price}
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box>Converted: {calculated}</Box>
        </Grid>
      </Grid>
    </Box>
  )
}
