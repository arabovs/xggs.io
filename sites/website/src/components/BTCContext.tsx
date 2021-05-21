import React from "react"
import { gql } from "@apollo/client"
const client = require("../../../../packages/hasura/src/hasura/hasuraClient")

export const WContext = React.createContext(undefined)

export const BTCContextComponent = async ({ children }) => {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        crypto_price_updates(where: { crypto_code: { _eq: "BTC" } }) {
          selector
          url
        }
      }
    `,
  })

  return <WContext.Provider value={data}>{children}</WContext.Provider>
}
