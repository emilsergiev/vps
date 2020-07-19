import React from 'react'
import { Link } from 'react-router-dom'
import {
  HomeOutline, Power, LightbulbOutline, TargetAccount, BookOpenPageVariant
} from 'mdi-material-ui'
import {
  Button, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core'

import { useConnect } from '@blockstack/connect'

export default function SideBar(props) {
  const { doOpenAuth } = useConnect()
  return(
    <Drawer open={props.open} onClose={props.handleClose}>
      <List>
        <ListItem button onClick={props.handleClose} key="home" component={Link} to="/">
          <ListItemIcon>
            <HomeOutline />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider />
      { props.userData ?
        <List>
          <ListItem button key="out" component={Button} onClick={props.handleSignOut}>
            <ListItemIcon>
              <Power color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List> :
        <List>
          <ListItem button key="in" component={Button} onClick={() => doOpenAuth()}>
            <ListItemIcon>
              <Power />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </ListItem>
        </List>
      }
      <List>
        <ListItem button key="theme" component={Button} onClick={props.toggleTheme}>
          <ListItemIcon>
            <LightbulbOutline />
          </ListItemIcon>
          <ListItemText primary="Theme" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="about" onClick={props.handleClose}
          component={Link} to="/about"
        >
          <ListItemIcon>
            <BookOpenPageVariant />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
      <List>
        <ListItem button key="test" onClick={props.handleClose}
          component={Link} to="/testname.id.blockstack"
        >
          <ListItemIcon>
            <TargetAccount />
          </ListItemIcon>
          <ListItemText primary="Testing..." />
        </ListItem>
      </List>
    </Drawer>
  )
}
