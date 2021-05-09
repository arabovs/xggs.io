import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box } from "@material-ui/core"
import { graphql } from "gatsby"

const Pricing = () => {
  const { data, loading, error } = useSubscription(gql`
    subscription MySubscription {
      crypto_price_updates(order_by: { created_at: desc }, limit: 1) {
        value
      }
    }
  `)
  if (loading) {
    return <Box>Loading</Box>
  }
  if (error) {
    console.log(error)
    return <Box>Error</Box>
  }
  console.log(data)
  return <Box>{data.crypto_price_updates[0].value}</Box>
}

export default Pricing
