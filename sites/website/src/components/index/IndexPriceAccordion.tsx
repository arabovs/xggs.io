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
  return (
    <ThemeProvider theme={indexTheme}>
      <Box m={0.2} p={0.2}>
        <Paper>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {props.index_code} Price Conversion:
            </AccordionSummary>
            <AccordionDetails>
              <Container>
                <IndexTitle
                  index_code={props.index_code}
                  source={props.source}
                />
              </Container>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Box>
    </ThemeProvider>
  )
}
