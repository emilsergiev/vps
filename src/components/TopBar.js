import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { LightbulbOutline } from 'mdi-material-ui'
import { AppBar, Toolbar, Tooltip, IconButton, Typography } from '@material-ui/core'

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
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title}>
            <Tooltip title="Toggle light/dark theme" placement="bottom">
              <IconButton className={classes.light} onClick={props.toggleTheme}>
                <LightbulbOutline />
              </IconButton>
            </Tooltip>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TopBar
