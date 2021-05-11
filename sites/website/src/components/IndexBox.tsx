import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box } from "@material-ui/core"

export const IndexBox = props => {
  const { data, loading, error } = useSubscription(
    gql`
      subscription IndexPriceSubscription($crypto_base_code: String!) {
        index_price_updates(
          where: { crypto_base_code: { _eq: $crypto_base_code } }
          order_by: { created_at: desc }
          limit: 1
        ) {
          crypto_index_price
          crypto_base_code
        }
      }
    `,
    {
      variables: {
        crypto_base_code: props.crypto_base_code,
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
      FTSE100{": "}
      {data.index_price_updates[0].crypto_index_price} :{" "}
      {data.index_price_updates[0].crypto_base_code}
    </Box>
  )
}

//beautiful work kdichev
