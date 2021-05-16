import React from "react"
import {
  Box,
  Grid,
  Paper,
  Container,
  ThemeProvider,
  Fade,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { IndexPriceGrid } from "../components/index/IndexPriceGrid"
import { GridPrice } from "../components/GridPrice"
import { indexTheme } from "../theme/indexTheme"

const client = require("../../../../packages/hasura/src/hasura/hasuraClient")
const { default: gql } = require("graphql-tag")

const Index = () => {
  const [shouldFade, setShouldFade] = React.useState(false)
  React.useEffect(() => {
    setShouldFade(true)
  }, [])

  return (
    <Box>
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
                    <Fade in={shouldFade}>
                      <Box>
                        <Grid container spacing={1}>
                          <Grid item sm={6} xs={12}>
                            <GridPrice crypto_code="BTC" />
                          </Grid>
                        </Grid>
                        <IndexPriceGrid />
                      </Box>
                    </Fade>
                  </Box>
                </ThemeProvider>
              </Container>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Box>
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
                    <Fade in={shouldFade}>
                      <Box>
                        <Grid container spacing={1}>
                          <Grid item sm={6} xs={12}>
                            <GridPrice crypto_code="BTC" />
                          </Grid>
                        </Grid>
                        <IndexPriceGrid />
                      </Box>
                    </Fade>
                  </Box>
                </ThemeProvider>
              </Container>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Box>
    </Box>
  )
}

export default Index
