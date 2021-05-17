import React from "react"
import { NavigationBanner } from "../components/navigation/NavigationBanner"
import { SideDrawer } from "../components/navigation/Drawer"
import Provider from "../../../../packages/hasura/src/hasura/hasuraProvider"

const NavigationAndSideBar = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <NavigationBanner onMenuClick={() => setOpen(prevOpen => true)} />
      <SideDrawer open={open} onCloseClick={() => setOpen(prevOpen => false)} />
    </>
  )
}

export const wrapRootElement = ({ element }) => {
  return (
    <Provider>
      <div>
        <NavigationAndSideBar />
        {element}
      </div>
    </Provider>
  )
}
