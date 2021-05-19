import React from "react"
import { Box, Paper } from "@material-ui/core"
import { IndexPriceAccordion } from "../components/index/IndexPriceAccordion"
import { useSubscription, gql } from "@apollo/client"
import client from "../../../../packages/hasura/src/hasura/hasuraClient"

const Index = () => {
  const { data, loading, error } = useSubscription(
    gql`
      subscription cryptoPriceUpdates {
        crypto_price_updates(
          where: { crypto_code: { _eq: "BTC" } }
          order_by: { created_at: desc }
          limit: 1
        ) {
          crypto_price
        }
      }
    `,
    {}
  )
  console.log(data)

  if (loading) {
    return <Box>Loading</Box>
  }

  if (error) {
    return <Box>Error</Box>
  }

  return (
    <Box>
      <Box align="center">
        <h1>Welcome to xggs.io</h1>
        <h6>Financial Security Indeces conversion to Crypto Currency</h6>
      </Box>
      <Box m={1} p={1}>
        <Paper elevation={2}>
          <IndexPriceAccordion
            index_code="FTSE100"
            source="LSE"
            crypto_price={data.crypto_price_updates[0].crypto_price}
          />
          <IndexPriceAccordion index_code="FTSE250" source="LSE" />
          <IndexPriceAccordion index_code="FTSE350" source="LSE" />
        </Paper>
      </Box>
    </Box>
  )
}

export default Index
