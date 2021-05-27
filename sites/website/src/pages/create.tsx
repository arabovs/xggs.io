import React from "react"
import { Box, Button } from "@material-ui/core"
import { createETHAccount } from "../../../../packages/web3-eth/src/web3-eth-lib/web3-create-account"

const Create = () => {
  return (
    <Box>
      <Button
        onClick={() => {
          fetch(createETHAccount())
            .then(response => response.json())
            .then(data => console.log("This is your data", data))
        }}
      >
        ahaha
      </Button>
    </Box>
  )
}

export default Create
