import React from "react"
import { Box } from "@material-ui/core"
import { IndexPriceAccordion } from "../components/index/IndexPriceAccordion"

const Index = () => {
  return (
    <Box>
      <IndexPriceAccordion index_code="FTSE100" source="LSE" />
      <IndexPriceAccordion index_code="FTSE250" source="LSE" />
      <IndexPriceAccordion index_code="FTSE350" source="LSE" />
    </Box>
  )
}

export default Index
