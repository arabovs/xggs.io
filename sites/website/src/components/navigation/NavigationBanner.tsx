import React from "react"
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import { BurgerMenu } from "./BurgerMenu"

export const NavigationBanner = ({ onMenuClick }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <BurgerMenu onClick={onMenuClick} />
        <Typography variant="h6">Page</Typography>
        <Button color="inherit">Yep</Button>
      </Toolbar>
    </AppBar>
  )
}
