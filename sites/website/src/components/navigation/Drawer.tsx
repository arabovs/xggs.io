import React from "react"
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core"
import {
  ArrowBack,
  Inbox as InboxIcon,
  Mail as MailIcon,
} from "@material-ui/icons"

export const SideDrawer = ({ open, onCloseClick }) => {
  return (
    <Drawer
      open={open}
      PaperProps={{ style: { width: 250 } }}
      variant="temporary"
    >
      <Toolbar>
        <ArrowBack onClick={onCloseClick}>
          <MailIcon />
        </ArrowBack>
      </Toolbar>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}
