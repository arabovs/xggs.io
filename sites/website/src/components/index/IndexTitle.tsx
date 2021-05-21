import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box, Grid, Paper, Typography, ThemeProvider } from "@material-ui/core"
import { indexTheme } from "../../theme/indexTheme"

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

  return (
    <ThemeProvider theme={indexTheme}>
      <Paper>
        <Box m={0.1}>{data}</Box>
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
                        <Box>{data.index_price_updates[0].index_price}</Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box m={1} p={1}>
            WORK IN PROGRESS
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  )
}
