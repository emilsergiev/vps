import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container, Grid, Paper, Typography, LinearProgress
} from '@material-ui/core'
import { lookupProfile } from 'blockstack'
import Error404 from 'pages/Error404'
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  title: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    wordWrap: "break-word",
  },
  progress: {
    width: '100%',
  },
  edit: {
    textAlign: 'right',
  }
}))

const ViewPoint = (props) => {
  const classes = useStyles()
  const { name, id } = props.match.params

  const [point, setPoint] = useState({})
  const [loading, setLoading] = useState(true)
  const [userNotFound, setUserNotFound] = useState(false)
  const [pointNotFound, setPointNotFound] = useState(false)

  const markup = html => { return {__html: html} }

  useEffect(() => {
    lookupProfile(name).then((profile) => {
      let appHub = _.get(profile.apps, window.location.origin.toString())
      fetch(appHub + `point-${id}.json`)
        .then(response => { return response.json()})
        .then(data => {
          setPoint(data)
          setLoading(false)
        })
        .catch(error => { setPointNotFound(true) })
    }).catch(notFound => { setUserNotFound(true) })
  }, [name, id])

  if (userNotFound) {
    return <Error404 msg={`user "${name}" does not exist!`} />
  } else if (pointNotFound) {
    return <Error404 msg={`view point "${id}" does not exist!`} />
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.title}>
          {
            loading ?
            <LinearProgress className={classes.progress} /> :
            <Typography variant="h5" component="h1">{point.title}</Typography>
          }
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          {
            loading ?
            <LinearProgress className={classes.progress} /> :
            <>
              <Typography variant="caption" component="p">
                {point.date}<br /><br />
              </Typography>
              <Typography dangerouslySetInnerHTML={markup(point.description)} />
              <Typography component="p" variant="caption" className={classes.edit}>
                <br />{point.editDate ? 'Last edit: ' + point.editDate : '' }
              </Typography>
            </>
          }
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ViewPoint
