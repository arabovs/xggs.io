import { Box } from "@material-ui/core"
import React from "react"
import { WContext } from "../WContextComponent"

const WhateverB = () => {
  const whateverb = React.useContext(WContext)

  return <Box>{whateverb}</Box>
}

export default WhateverB
