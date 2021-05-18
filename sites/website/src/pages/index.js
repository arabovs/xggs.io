import React from "react"
import { Box, Paper } from "@material-ui/core"
import { IndexPriceAccordion } from "../components/index/IndexPriceAccordion"

const Index = () => {
  return (
    <Box>
      <Box align="center">
        <h1>Welcome to xggs.io</h1>
        <h6>Financial Security Indeces conversion to Crypto Currency</h6>
      </Box>
      <Box m={1} p={1}>
        <Paper elevation={2}>
          <IndexPriceAccordion index_code="FTSE100" source="LSE" />
          <IndexPriceAccordion index_code="FTSE250" source="LSE" />
          <IndexPriceAccordion index_code="FTSE350" source="LSE" />
        </Paper>
      </Box>
    </Box>
  )
}

export default Index
