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

  const {
    data: crypto_data,
    loading: crypto_loading,
    error: crypto_error,
  } = useSubscription(
    gql`
      subscription CryptoPriceSubscription(
        $source: String!
        $crypto_code: String!
      ) {
        crypto_price_updates(
          where: {
            source: { _eq: $source }
            crypto_code: { _eq: $crypto_code }
          }
          order_by: { created_at: desc }
          limit: 1
        ) {
          crypto_price
        }
      }
    `,
    {
      variables: {
        source: props.crypto_source,
        crypto_code: props.crypto_code,
      },
    }
  )

  console.log("LOG", crypto_data)
  let calculated = 0.0
  if (loading) {
    return <Box>Loading</Box>
  }
  if (error) {
    return <Box>Error</Box>
  }

  if (crypto_data !== null) {
    calculated =
      data.index_price_updates[0].index_price /
      crypto_data.crypto_price_updates[0].crypto_price
  }
  console.log("LOG2", data)

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
