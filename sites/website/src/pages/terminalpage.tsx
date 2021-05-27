import React, { Component } from "react"
import { Box } from "@material-ui/core"
import Terminal from "terminal-in-react"
import { render } from "react-dom"

const TerminalPage = () => {
  const showMsg = () => "Hello World"

  return (
    <Box>
      <Terminal
        color="green"
        backgroundColor="black"
        barColor="black"
        style={{ fontSize: "1em" }}
        outputColor="yellow"
        commands={{
          "open-google": () => window.open("https://www.google.com/", "_blank"),
          showmsg: showMsg,
          popup: () => alert("Terminal in React"),
        }}
        msg="You can write anything here. Example - Hello! My name is Foo and I like Bar."
      />
    </Box>
  )
}

export default TerminalPage
