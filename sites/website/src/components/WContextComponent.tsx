import React from "react"

export const WContext = React.createContext(undefined)

export const WContextComponent = ({ children }) => {
  return (
    <WContext.Provider value="Only tough people last">
      {children}
    </WContext.Provider>
  )
}
