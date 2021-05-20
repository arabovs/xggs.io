import React from "react"
import { Box } from "@material-ui/core"
import { Whatever } from "../components/index/Whatever"
import { WContextComponent } from "../components/WContextComponent"
import WhateverB from "../components/index/WhateverB"

const Z = () => {
  return (
    <WContextComponent>
      <Whatever />
      <WhateverB />
    </WContextComponent>
  )
}

export default Z
