import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { HomeOutline, LightbulbOutline, Power } from 'mdi-material-ui'
import { AppBar, Toolbar, Tooltip, IconButton, Typography, Link } from '@material-ui/core'

import { useConnect } from '@blockstack/connect'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 70,
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
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title}>
            <Tooltip title="Go home" placement="bottom">
              <IconButton className={classes.home}>
                <Link color="inherit" component={RouterLink} to="/" >
                  <HomeOutline />
                </Link>
              </IconButton>
            </Tooltip>
          </Typography>
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
    </div>
  )
}

export default TopBar
