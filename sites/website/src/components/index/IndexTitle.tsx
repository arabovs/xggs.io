import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box, Grid, Paper, Typography, ThemeProvider } from "@material-ui/core"
import { indexTheme } from "../../theme/indexTheme"

export const IndexTitle = props => {
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
                        <Box>ADD SUBSCRIPTION HERE</Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box>WORK IN PROGRESS</Box>
        </Box>
      </Paper>
    </ThemeProvider>
  )
}
