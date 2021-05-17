import React from "react"
import { IconButton } from "@material-ui/core"
import { Menu as MenuIcon } from "@material-ui/icons"

export const BurgerMenu = props => {
  return (
    <IconButton edge="end" color="inherit" aria-label="menu" {...props}>
      <MenuIcon />
    </IconButton>
  )
}
