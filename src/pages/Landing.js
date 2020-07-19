import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper, Box } from '@material-ui/core'

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

export default function Landing() {
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>Hello, Point Viewer!</h1>
            <h2>The landing page is being designed...</h2>
            <h3>It's under construction; However, it's coming soon!</h3>
            <p>xs=12</p>
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
      <Box my={3}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Box>
    </Container>
  )
}
