import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  ThemeProvider,
} from "@material-ui/core"
import { BurgerMenu } from "./BurgerMenu"
import { indexTheme } from "../../theme/indexTheme"

export const NavigationBanner = ({ onMenuClick }) => {
  return (
    <ThemeProvider theme={indexTheme}>
      <AppBar position="static">
        <Toolbar>
          <BurgerMenu onClick={onMenuClick} marginRight={1} />
          <Box marginLeft={1}>xggs.io</Box>
          <Button>
            <Box marginLeft={1}>About</Box>
          </Button>
          <Button>Idea behind</Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}
