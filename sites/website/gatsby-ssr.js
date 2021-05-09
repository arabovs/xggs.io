/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import Provider from "./../../packages/coinmarket-cap-scraper/src/hasura/hasuraProvider"
export const wrapRootElement = ({ element }) => {
  return <Provider>{element}</Provider>
}
