import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box, Grid, Paper, Typography, ThemeProvider } from "@material-ui/core"
import { indexTheme } from "../../theme/indexTheme"
import client from "../../../../../packages/hasura/src/hasura/hasuraClient"

export const IndexTitle = props => {
  const { data, loading, error } = useSubscription(
    gql`
      subscription IndexPriceUpdates($index_code: String!, $source: String!) {
        index_price_updates(
          where: {
            index_code: { _eq: $index_code }
            _and: { source: { _eq: $source } }
          }
          order_by: { created_at: desc }
          limit: 1
        ) {
          index_price
        }
      }
    `,
    {
      variables: {
        index_code: props.index_code,
        source: props.source,
      },
    }
  )

  if (error) {
    return <Box>Error - contact admin</Box>
  }

  if (loading) {
    return <Box>Fetching Data</Box>
  }
  const index_price = data.index_price_updates[0].index_price

  /**
  ;(async () => {
    const { crypto_price_update } = await getCryptoSelector()
    console.log(crypto_price_update)
  })()
   */

  const calculate = index_price / props.crypt_price

  return (
    <ThemeProvider theme={indexTheme}>
      <Paper>
        <Box>
          <Grid container spacing={1}>
            <Grid container spacing={1}>
              <Grid container spacing={1}>
                <Grid item sm={6} xs={12}>
                  <Box p={0.2} m={0.4} border={0.1} borderRadius={6}>
                    <Grid container spacing={1}>
                      <Grid item sm={5} xs={12}>
                        <Box p={0.2} m={0.4}>
                          Data Source:
                        </Box>
                      </Grid>
                      <Grid item sm={7} xs={12}>
                        <Box p={0.2} m={0.4}>
                          {props.source}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box p={0.2} m={0.4} border={0.1} borderRadius={6}>
                    <Grid container spacing={1}>
                      <Grid item sm={1} xs={12}>
                        <Box>$:</Box>
                      </Grid>
                      <Grid item sm={11} xs={12}>
                        <Box>{index_price}</Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box m={1} p={1}>
            <Paper>
              <Grid container spacing={1}>
                <Grid item sm={6} xs={12}>
                  <Grid container spacing={1}>
                    <Grid item sm={4} xs={12}>
                      <Box>BTC Conversion</Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box>X2</Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box>X3</Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box>{calculate}</Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box>X5</Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box>X6</Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Grid container spacing={1}>
                    <Grid item sm={4} xs={12}>
                      <Box>Y1</Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box>Y2</Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box>Y3</Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box>Y4</Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box>Y5</Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Box>Y6</Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  )
}
