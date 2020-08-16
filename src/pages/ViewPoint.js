import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container, Grid, Paper, Typography, LinearProgress, IconButton, Link
} from '@material-ui/core'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import { Person, lookupProfile } from 'blockstack'
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

  const [person, setPerson] = useState()
  const [point, setPoint] = useState({})
  const [loading, setLoading] = useState(true)
  const [userNotFound, setUserNotFound] = useState(false)
  const [pointNotFound, setPointNotFound] = useState(false)
  const [likes, setLikes] = useState(Math.floor((Math.random() * 1000) + 10))
  const [dislikes, setDislikes] = useState(Math.floor((Math.random() * 50) + 1))

  const markup = html => { return {__html: html} }

  const addToLikes = () => { setLikes(likes + 1) }
  const addToDislikes = () => { setDislikes(dislikes + 1) }

  useEffect(() => {
    lookupProfile(name).then((profile) => {
      setPerson(new Person(profile))
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
          <Paper elevation={3} className={classes.title}>
          {
            loading ?
            <LinearProgress className={classes.progress} /> :
            <Typography variant="h5" component="h1">{point.title}</Typography>
          }
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
          {
            loading ?
            <LinearProgress className={classes.progress} /> :
            <>
              <Typography color="textSecondary" variant="caption" component="p">
                {point.date}<br /><br />
              </Typography>
              <Typography dangerouslySetInnerHTML={markup(point.description)} />
              <br />
              <Typography
                component="p"
                variant="caption"
                color="textSecondary"
                className={classes.edit}
              >
                {point.editDate ? 'Last edit: ' + point.editDate : '' }
              </Typography>
              <Typography className={classes.edit}>
                <Typography component="span">&#8212; &nbsp;</Typography>
                <Link color="textPrimary" component={RouterLink}
                  to={"/" + name}>{person.name() ? person.name() : 'Anonymous'}
                </Link>
              </Typography>
            </>
          }
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <IconButton color="inherit" onClick={addToLikes}>
              <ThumbUpOutlinedIcon fontSize="small" />
            </IconButton>
            <Typography variant="caption">{likes}</Typography>
            <IconButton color="inherit" onClick={addToDislikes}>
              <ThumbDownOutlinedIcon fontSize="small" />
            </IconButton>
            <Typography variant="caption">{dislikes}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ViewPoint
