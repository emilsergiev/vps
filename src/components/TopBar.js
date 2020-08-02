import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Menu, HomeOutline, LightbulbOutline, Power } from 'mdi-material-ui'
import {
  AppBar, Link, Toolbar, Tooltip, IconButton, Typography
} from '@material-ui/core'
import { useConnect } from '@blockstack/connect'
import Search from 'components/Search'

const useStyles = makeStyles(theme => ({
  home: {
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

  return (
    <AppBar>
      <Toolbar>
        <Tooltip title="Open sidebar" placement="bottom">
          <IconButton
            edge="start"
            aria-label="Open drawer"
            onClick={props.handleOpen}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
        </Tooltip>
        <Typography className={classes.title}>
          <Tooltip title="Go home" placement="bottom">
            <IconButton className={classes.home}>
              <Link color="inherit" component={RouterLink} to="/" >
                <HomeOutline />
              </Link>
            </IconButton>
          </Tooltip>
        </Typography>
        <Search />
        <Typography className={classes.title}>
          <Tooltip title="Toggle light/dark theme" placement="bottom">
            <IconButton className={classes.light} onClick={props.toggleTheme}>
              <LightbulbOutline />
            </IconButton>
          </Tooltip>
        </Typography>
        {
          !props.userData ?
          <Tooltip title="Sign In" placement="bottom">
            <IconButton className={classes.power} onClick={() => doOpenAuth()}>
              <Power />
            </IconButton>
          </Tooltip> :
          <Tooltip title="Sign Out" placement="bottom">
            <IconButton className={classes.power} onClick={props.handleSignOut}>
              <Power color="secondary" />
            </IconButton>
          </Tooltip>
        }
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
