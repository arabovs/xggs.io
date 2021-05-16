import React from "react"
import { useSubscription, gql } from "@apollo/client"
import { Box, Grid, Paper, Typography } from "@material-ui/core"

export const IndexPriceGrid = props => {
  const indeces = ["FTSE100", "FTSE250", "FTSE350", "FTSEALL"]

  return (
    <Grid container spacing={1}>
      {indeces.map(i => (
        <Grid item sm={6} xs={12} style={{ height: "100%" }}>
          <Paper
            elevation={1}
            style={{ opacity: 0.75, minHeight: "60vh", maxHeight: "60vh" }}
          >
            <Box py={2} m={1}>
              <Typography variant="h3" gutterBottom align="center">
                {i}
              </Typography>
              <Typography variant="subtitle1" align="center">
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
  )
}
