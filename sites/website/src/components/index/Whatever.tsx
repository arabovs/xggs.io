import React from "react"
import { Box } from "@material-ui/core"
import { WContext } from "../WContextComponent"

export const Whatever = props => {
  const whatever = React.useContext(WContext)
  return (
    <div>
      <Box>{whatever}</Box>
    </div>
  )
}
