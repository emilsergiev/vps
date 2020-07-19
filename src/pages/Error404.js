import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function Error404() {
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Paper className={classes.paper}>
          <h1>404</h1>
          <h2>This is not the page you're looking for!</h2>
          <h3>Move along...</h3>
        </Paper>
      </Grid>
    </Container>
  )
}
