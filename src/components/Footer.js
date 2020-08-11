import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper, Container, Grid, Typography, Link, IconButton
} from '@material-ui/core'
import { Github, Twitter } from 'mdi-material-ui'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  right: {
    float: 'right',
  }
}))

const Footer = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <IconButton
              component={Link}
              href="https://github.com/bissisoft/vps"
              target="_blank"
              rel="noopener"
            >
              <Github color="action" />
            </IconButton>
            <IconButton
              component={Link}
              href="https://twitter.com/BissiSoft"
              target="_blank"
              rel="noopener"
            >
              <Twitter color="action" />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="error" className={classes.right}>
              Made with love by<br />
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/bissisoft.id.blockstack"
              >
                BissiSoft
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  )
}

export default Footer
