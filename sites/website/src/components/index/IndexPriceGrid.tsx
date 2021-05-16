import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box, Grid, Paper, Typography, ThemeProvider } from "@material-ui/core"
import { indexTheme } from "../../theme/indexTheme"

export const IndexPriceGrid = props => {
  const indeces = ["FTSE100", "FTSE250", "FTSE350", "FTSEALL"]

  return (
    <ThemeProvider theme={indexTheme}>
      <Grid container spacing={1}>
        {indeces.map(i => (
          <Grid item sm={6} xs={12} style={{ height: "100%" }}>
            <Paper
              elevation={1}
              style={{ opacity: 0.75, minHeight: "40vh", maxHeight: "40vh" }}
            >
              <Box py={0.5} m={0.2}>
                <Typography variant="h5" gutterBottom align="left">
                  {i}
                </Typography>
                <Typography variant="subtitle1" align="left">
                  {i}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  style={{ minHeight: "40vh", maxHeight: "40vh" }}
                >
                  asd
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  )
}
