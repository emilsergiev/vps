import React, { useState, useEffect } from 'react'
import { lookupProfile } from 'blockstack'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper } from '@material-ui/core'
import Error404 from 'pages/Error404'
import _ from 'lodash'

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

const ViewPoint = (props) => {
  const classes = useStyles()
  const { name, id } = props.match.params

  const [point, setPoint] = useState({})
  const [userNotFound, setUserNotFound] = useState(false)
  const [pointNotFound, setPointNotFound] = useState(false)

  useEffect(() => {
    lookupProfile(name).then((profile) => {
      let appHub = _.get(profile.apps, window.location.origin.toString())
      fetch(appHub + `point-${id}.json`)
        .then(response => { return response.json()})
        .then(data => { setPoint(data)})
        .catch(error => { setPointNotFound(true) })
    }).catch(notFound => { setUserNotFound(true) })
  }, [name, id])

  if (userNotFound) {
    return (
      <Error404
        msg={`user "${name}" does not exist!`}
      />
    )
  } else if (pointNotFound) {
    return (
      <Error404
        msg={`view point "${id}" does not exist!`}
      />
    )
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>{point.title}</h1>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <p>{point.description}</p>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
export default ViewPoint
