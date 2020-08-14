import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar, Link, Toolbar, Tooltip, IconButton, Typography,
  Avatar, Menu as AccountMenu, MenuItem
} from '@material-ui/core'
import { Menu, HomeOutline, LightbulbOutline, Power } from 'mdi-material-ui'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import avatarFallbackImage from 'assets/anon.png'
import { useConnect } from '@blockstack/connect'
import { PROFILE_URL } from 'assets/constants'
import Search from 'components/Search'
import { Person } from 'blockstack'

const useStyles = makeStyles(theme => ({
  home: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuButton: {
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
  light: {
    float: 'right',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}))

const TopBar = (props) => {
  const classes = useStyles()
  const { doOpenAuth } = useConnect()
  const { userData, handleOpen, toggleTheme, handleSignOut } = props

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  let avatarImg

  if (userData) {
    let person = new Person(userData.profile)
    avatarImg = person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
  }

  const handleMenu = (event) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }

  return (
    <AppBar>
      <Toolbar>
        <Tooltip title="Open sidebar" placement="bottom">
          <IconButton
            edge="start"
            aria-label="Open drawer"
            onClick={handleOpen}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
        </Tooltip>
        <Typography className={classes.home}>
          <Tooltip
            placement="bottom"
            title={ userData ? 'My home page' : 'Landing page' }
          >
            <IconButton
              component={RouterLink}
              to={ userData ? '/'+userData.username : '/' }
            >
              <HomeOutline />
            </IconButton>
          </Tooltip>
        </Typography>
        <Search />
        <Typography className={classes.title}>
          <Tooltip title="Toggle light/dark theme" placement="bottom">
            <IconButton className={classes.light} onClick={toggleTheme}>
              <LightbulbOutline />
            </IconButton>
          </Tooltip>
        </Typography>
        {
          userData ?
          <>
            <Tooltip title="Profile" placement="bottom">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Avatar alt="avatar" src={avatarImg} />
              </IconButton>
            </Tooltip>
            <AccountMenu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              keepMounted
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to={'/'+userData.username}
              >
                <HomeOutline /> &nbsp; My home page
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                color="textPrimary"
                href={PROFILE_URL}
                target="_blank"
                rel="noopener"
              >
                <SettingsOutlinedIcon /> &nbsp; Edit my profile
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <Power color="secondary" /> &nbsp; Sign Out
              </MenuItem>
            </AccountMenu>
          </>
          :
          <>
            <Tooltip title="Register/Sign In" placement="bottom">
              <IconButton
                aria-label="register login"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircleOutlinedIcon />
              </IconButton>
            </Tooltip>
            <AccountMenu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              keepMounted
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                doOpenAuth()
                handleClose()
              }}>
                <CreateOutlinedIcon /> &nbsp; Register
              </MenuItem>
              <MenuItem onClick={() => {
                doOpenAuth(true)
                handleClose()
              }}>
                <Power /> &nbsp; Sign In
              </MenuItem>
            </AccountMenu>
          </>
        }
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
