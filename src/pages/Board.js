import React, { useState, useEffect } from 'react'
import { Person, lookupProfile } from 'blockstack'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar, Container, Grid, Typography, Chip, Button,
  Card, CardActionArea, CardContent, CardMedia, TextField,
  Accordion, AccordionDetails, AccordionSummary,
} from '@material-ui/core'
import { ChevronDown, ContentSave } from 'mdi-material-ui'
import Error404 from './Error404'
import _ from 'lodash'

const loadingImage = 'https://theview.site/loading.gif'
const avatarFallbackImage = 'https://theview.site/anon.png'

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
  let isOwner = false;

  if (props.user) {
    isOwner = props.user.username === props.match.params.name
  }

  const username = props.match.params.name

  const classes = useStyles()

  const [state, setState] = useState({
    person: {
      name() { return 'Loading...' },
      avatarUrl() { return loadingImage },
      description() { return '' },
    },
    apps: {},
    hasErrors: false,
  })

  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const [values, setValues] = useState({ viewPoint: '', })

  const handleInputChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  useEffect(() => {
    let isSubscribed = true
    lookupProfile(username).then((profile) => {
      if (isSubscribed) {
        setState({
          person: new Person(profile),
          apps: profile.apps,
        })
      }
    }).catch((error) => { setState({hasErrors: true}) })
    return () => isSubscribed = false
  }, [username])

  if (state.hasErrors) { return (<Error404 />) }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={ state.person.avatarUrl() ? state.person.avatarUrl() : avatarFallbackImage }
                title={ state.person.name() ? state.person.name() : 'Anonymous' }
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h1">
                  { state.person.name() ? state.person.name() : 'Anonymous' }
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
                { state.person.description() }
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography color="textSecondary">View Points</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textPrimary" component="pre">
                <Typography color="error" component="span">Testing... </Typography>
                {values.viewPoint}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography color="textSecondary">Blogs on Blockstack</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
                state.apps &&
                state.apps['https://airtext.xyz'] &&
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
                state.apps &&
                state.apps['https://app.sigle.io'] &&
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
          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography color="textSecondary">Blockstack Dapps</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {
                  _.keys(state.apps).map((key) => (
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
          <React.Fragment>
            <TextField
              id="outlined-multiline-flexible"
              label="What's your view point for the day?"
              multiline
              rows="5"
              value={values.viewPoint}
              onChange={handleInputChange('viewPoint')}
              className={classes.textField}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button variant="outlined" color="inherit" fullWidth className={classes.button}>
              <ContentSave className={classes.leftIcon} /> Save
            </Button>
          </React.Fragment>
        }
      </Grid>
    </Container>
  )
}

export default Board
