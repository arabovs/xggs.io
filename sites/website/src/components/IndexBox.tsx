import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box } from "@material-ui/core"

export const IndexBox = props => {
  const { data, loading, error } = useSubscription(
    gql`
      subscription CryptoPriceSubscription($crypto_code: String!) {
        crypto_price_updates(
          where: { crypto_code: { _eq: $crypto_code } }
          order_by: { created_at: desc }
          limit: 1
        ) {
          value
          crypto_code
        }
      }
    `,
    {
      variables: {
        crypto_code: "BTC",
      },
    }
  )

  const data1 = useSubscription(
    gql`
      subscription IndexPriceSubscription($index_code: String!) {
        crypto_price_updates(
          where: { crypto_code: { _eq: $index_code } }
          order_by: { created_at: desc }
          limit: 1
        ) {
          value
          crypto_code
        }
      }
    `,
    {
      variables: {
        index_code: props.index_code,
      },
    }
  )

  if (loading && data1.loading) {
    return <Box>Loading</Box>
  }
  if (error && data1.error) {
    console.log(error)
    return <Box>Error</Box>
  }

  return (
    <Box>
      {props.index_code} to BTC :{" "}
      {data1.data.crypto_price_updates[0].value /
        data.crypto_price_updates[0].value}
    </Box>
  )
}

//beautiful work kdichev
