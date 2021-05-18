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
import { IndexTitle } from "./IndexTitle"
import GridPrice from "../GridPrice"

import { indexTheme } from "../../theme/indexTheme"

export const IndexPriceAccordion = props => {
  const indeces = ["FTSE100", "FTSE250", "FTSE350", "FTSEALL"]

  return (
    <ThemeProvider theme={indexTheme}>
      <Box m={1} p={1}>
        <Paper>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              FTSE Indexes
            </AccordionSummary>
            <AccordionDetails>
              <Container>
                <IndexTitle index_code="FTSE100" source="LSE" />
              </Container>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Box>
    </ThemeProvider>
  )
}
