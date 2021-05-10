import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box } from "@material-ui/core"

export const PriceBox = props => {
  const { data, loading, error } = useSubscription(
    gql`
      subscription BTCPriceSubscription($crypto_code: String!) {
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
        crypto_code: props.crypto_code,
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
  return (
    <Box>
      {props.crypto_code} : {data.crypto_price_updates[0].value}
    </Box>
  )
}

//beautiful work kdichev
