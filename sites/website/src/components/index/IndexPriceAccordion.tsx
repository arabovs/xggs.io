import React from "react"
import { useSubscription, gql } from "@apollo/client"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  ThemeProvider,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { IndexPriceGrid } from "./IndexPriceGrid"
import GridPrice from "../GridPrice"

import { indexTheme } from "../../theme/indexTheme"

export const IndexPriceAccordion = props => {
  const indeces = ["FTSE100", "FTSE250", "FTSE350", "FTSEALL"]

  return (
    <Box m={1} p={1}>
      <Paper>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>FTSE Indexes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Container style={{ backgroundColor: "DodgerBlue" }}>
              <ThemeProvider theme={indexTheme}>
                <Box>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid
                        item
                        sm={12}
                        xs={12}
                        style={{ backgroundColor: "DodgerBlue" }}
                      >
                        <GridPrice crypto_code="BTC" />
                      </Grid>
                    </Grid>
                    <IndexPriceGrid />
                  </Box>
                </Box>
              </ThemeProvider>
            </Container>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  )
}
