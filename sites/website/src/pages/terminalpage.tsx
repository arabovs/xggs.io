import React, { Component } from "react"
import { Box } from "@material-ui/core"
import Terminal from "terminal-in-react"
import { render } from "react-dom"

const TerminalPage = () => {
  const showMsg = () => "2"

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Terminal
        color="green"
        backgroundColor="black"
        barColor="black"
        style={{ fontSize: "1em" }}
        outputColor="yellow"
        commands={{
          "count number": () =>
            window.open("https://www.google.com/", "_blank"),
          showmsg: showMsg,
          popup: () => alert("Terminal in React"),
        }}
        msg="This is a tiny terminal"
      />
    </Box>
  )
}

export default TerminalPage
