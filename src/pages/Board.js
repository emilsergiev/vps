import React, { useState, useEffect } from 'react'
import { Person, lookupProfile } from 'blockstack'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar, Container, Grid, Typography, Chip,
  Card, CardActionArea, CardContent, CardMedia,
  Accordion, AccordionDetails, AccordionSummary,
} from '@material-ui/core'
import { ChevronDown } from 'mdi-material-ui'
import { POINTS_FILENAME } from 'assets/constants'
import avatarFallbackImage from 'assets/anon.png'
import loadingImage from 'assets/loading.gif'
import PointForm from 'components/PointForm'
import PointsTable from 'components/PointsTable'
import Error404 from 'pages/Error404'
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 10,
    marginBottom: 20,
  },
  img: {
    maxWidth: 250,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    textAlign: 'center',
  },
  media: {
    // height: 0,
    paddingTop: '56.25%', // 16:9,
    // marginTop:'30'
  },
  chip: {
    margin: theme.spacing(0,1,1,0),
  },
  heading: {
    margin: 10,
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 90,
    height: 90,
  },
  textField: {
    margin: theme.spacing(1,0.5,1,0.5),
  },
  button: {
    margin: theme.spacing(0.5),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}))

const Board = (props) => {
  const classes = useStyles()
  const { userSession } = props
  const username = props.match.params.name

  let isOwner = false
  if (userSession.isUserSignedIn()) {
    isOwner = username === userSession.loadUserData().username
  }

  const [person, setPerson] = useState({
    name() { return 'Loading...' },
    avatarUrl() { return loadingImage },
    description() { return '' }
  })
  const [hub, setHub] = useState()
  const [apps, setApps] = useState([])
  const [points, setPoints] = useState([])
  const [bestPoint, setBestPoint] = useState({})
  const [expanded, setExpanded] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const updatePoints = updated => {
    setPoints(updated)
  }

  useEffect(() => {
    let isSubscribed = true
    lookupProfile(username).then((profile) => {
      let appHub = _.get(profile.apps, window.location.origin.toString())
      setHub(appHub)
      if (isSubscribed) {
        setPerson(new Person(profile))
        setApps(profile.apps)
        if (isOwner) {
          userSession.getFile(POINTS_FILENAME, {decrypt: false})
            .then(result => { setPoints(JSON.parse(result)) })
            .catch(error => {
              if (error.code === 'does_not_exist') {
                userSession.putFile(POINTS_FILENAME, '', { encrypt: false })
                setPoints([])
              } else {
                console.log(error.message)
              }
            })
        } else {
          fetch(appHub + POINTS_FILENAME)
            .then(response => { return response.json()})
            .then(data => { setPoints(data)})
            .catch(err => { setPoints([])})
        }
      }
    }).catch(notFound => { setUserNotFound(true) })
    return () => isSubscribed = false
  }, [username, isOwner, userSession])

  useEffect(() => {
    let lastPoint = _.last(points)
    if (lastPoint) {
      fetch(_.get(apps, window.location.origin.toString())+`point-${lastPoint.id}.json`)
        .then(response => { return response.json()})
        .then(data => { setBestPoint(data) })
        .catch(e => { console.log(e.message) })
    } else {
      setBestPoint({})
    }
  }, [points, apps])

  if (userNotFound) {
    return (
      <Error404
        msg={`user "${username}" does not exist or the blockchain api is down.`}
      />
    )
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage }
                title={ person.name() ? person.name() : 'Anonymous' }
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h1">
                  { person.name() ? person.name() : 'Anonymous' }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  { username }
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography color="textSecondary">Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                { person.description() }
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel2bh-content"
              id="panel1bh-header"
            >
              <Typography color="textSecondary">View Points</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PointsTable
                hub={hub}
                points={points}
                isOwner={isOwner}
                userSession={userSession}
                updatePoints={updatePoints}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel3bh-content"
              id="panel2bh-header"
            >
              <Typography color="textSecondary">Best View Point</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textPrimary" component="pre">
                <Typography color="textPrimary" component="p">
                  Created on: &nbsp;
                  <Typography color="error" component="span">
                    {bestPoint.date}
                  </Typography>
                </Typography>
                <Typography color="textPrimary" component="p">
                  ID: &nbsp;
                  <Typography color="error" component="span">
                    {bestPoint.id}
                  </Typography>
                </Typography>
                <Typography color="textPrimary" component="p">
                  Title: &nbsp;
                  <Typography color="error" component="span">
                    {bestPoint.title}
                  </Typography>
                </Typography>
                <Typography color="textPrimary" component="p">
                  Description: &nbsp;
                  <Typography color="error" component="span">
                    {bestPoint.description}
                  </Typography>
                </Typography>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel4bh-content"
              id="panel3bh-header"
            >
              <Typography color="textSecondary">Blogs on Blockstack</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
                apps &&
                apps['https://airtext.xyz'] &&
                <Chip
                  avatar={<Avatar alt="Airtext" src="https://airtext.xyz/favicon.ico" />}
                  label="Airtext"
                  component="a"
                  href={'https://airtext.xyz/blog/'+username}
                  target="_blank"
                  className={classes.chip}
                  clickable
                />
              }
              {
                apps &&
                apps['https://app.sigle.io'] &&
                <Chip
                  avatar={<Avatar alt="Sigle" src="https://app.sigle.io/favicon.ico" />}
                  label="Sigle"
                  component="a"
                  href={'https://app.sigle.io/'+username}
                  target="_blank"
                  className={classes.chip}
                  clickable
                />
              }
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel5bh-content"
              id="panel4bh-header"
            >
              <Typography color="textSecondary">Blockstack Dapps</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {
                  _.keys(apps).map((key) => (
                  key.substring(0, 17) !== 'http://localhost:' &&
                    <Chip
                      key={key}
                      size="small"
                      label={key}
                      component="a"
                      href={key}
                      target="_blank"
                      color="primary"
                      className={classes.chip}
                      clickable
                    />
                  ))
                }
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        {
          isOwner &&
          <PointForm
            points={points}
            userSession={userSession}
            updatePoints={updatePoints}
          />
        }
      </Grid>
    </Container>
  )
}

export default Board
