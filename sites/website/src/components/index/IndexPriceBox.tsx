import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box } from "@material-ui/core"

export const IndexPriceBox = props => {
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
  return (
    <Box>
      {props.index_code}
      {": "}
      {data.index_price_updates[0].index_price}
    </Box>
  )
}
