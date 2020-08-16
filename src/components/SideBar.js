import React from 'react'
import { useConnect } from '@blockstack/connect'
import { Link as RouterLink } from 'react-router-dom'
import {
  HomeOutline, Power, LightbulbOutline, TargetAccount, BookOpenPageVariant
} from 'mdi-material-ui'
import {
  Button, Drawer, List, Divider, ListItem,
  ListItemIcon, ListItemText, Link, Typography
} from '@material-ui/core'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import { PROFILE_URL } from 'assets/constants'

const SideBar = (props) => {
  const { doOpenAuth } = useConnect()
  const { userData, open, close, handleSignOut, toggleTheme } = props

  return(
    <Drawer open={open} onClose={close}>
      <List>
        <ListItem
          button
          key="home"
          onClick={close}
          component={RouterLink}
          to={ userData ? '/'+userData.username : '/' }
        >
          <ListItemIcon><HomeOutline /></ListItemIcon>
          <ListItemText primary={ userData ? 'MY HOME' : 'LANDING' } />
        </ListItem>
      </List>
      <Divider />
      {
        userData ?
        <>
          <List>
            <ListItem
              button
              key="out"
              component={Button}
              onClick={handleSignOut}
            >
              <ListItemIcon><Power color="secondary" /></ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              key="edit"
              component={Link}
              href={PROFILE_URL}
              target="_blank"
              rel="noopener"
              onClick={close}
            >
              <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
              <Typography color="textPrimary">PROFILE</Typography>
            </ListItem>
          </List>
        </>
        :
        <>
          <List>
            <ListItem
              button
              key="register"
              component={Button}
              onClick={() => { doOpenAuth(); close() }}
            >
              <ListItemIcon><CreateOutlinedIcon /></ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              key="signin"
              component={Button}
              onClick={() => { doOpenAuth(true); close() }}
            >
              <ListItemIcon><Power /></ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
          </List>
        </>
      }
      <List>
        <ListItem
          button
          key="theme"
          component={Button}
          onClick={toggleTheme}
        >
          <ListItemIcon><LightbulbOutline /></ListItemIcon>
          <ListItemText primary="Theme" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key="about"
          onClick={close}
          component={RouterLink}
          to="/about"
        >
          <ListItemIcon><BookOpenPageVariant /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
      <List>
        <ListItem
          button
          key="faq"
          onClick={close}
          component={RouterLink}
          to="/faq"
        >
          <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
          <ListItemText primary="FAQ" />
        </ListItem>
      </List>
      <List>
        <ListItem
          button
          key="test"
          onClick={close}
          component={RouterLink}
          to="/testname.id.blockstack"
        >
          <ListItemIcon><TargetAccount /></ListItemIcon>
          <ListItemText primary="Test" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default SideBar
