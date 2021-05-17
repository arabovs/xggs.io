import React from "react"
import { Box } from "@material-ui/core"
import { IndexPriceAccordion } from "../components/index/IndexPriceAccordion"

const client = require("../../../../packages/hasura/src/hasura/hasuraClient")
const { default: gql } = require("graphql-tag")

const Index = () => {
  const [shouldFade, setShouldFade] = React.useState(false)
  React.useEffect(() => {
    setShouldFade(true)
  }, [])

  return (
    <Box>
      <IndexPriceAccordion />
    </Box>
  )
}

export default Index
