import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const About = () => {
  const classes = useStyles()
  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>About Page</h1>
            <h2>Under Construction!</h2>
            <h3>Coming soon...</h3>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>2</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>2</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>2</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>2</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>2</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>2</Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default About
