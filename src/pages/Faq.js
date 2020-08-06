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

const Faq = () => {
  const classes = useStyles()
  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>Frequently Asked Questions</h1>
            <h2>Under Construction!</h2>
            <h3>Coming soon...</h3>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Faq
