import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper, Box } from '@material-ui/core'

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
  box: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}))

export default function Landing() {
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box my={3} className={classes.box}>
            <h1>Hello, point viewers and view point creators.</h1>
            <h2>Welcome to a new era of social networking!</h2>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h3>
              The View Point Site is a decentralized social networking application
              powered by blockchain technology via Blockstack (https://blockstack.org).
            </h3>
          </Paper>
        </Grid>
        <Box className={classes.box}>
          <h3>
            The View Point Site empowers you to publish your viewpoints,
            thoughts, feelings, etc. online while you, the creator, maintain
            full control over your content forever and ever... Amin.
          </h3>
        </Box>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <h2>Decentralized</h2>
            <p>
              Decentralized Apps are not controlled by any single authority.
              Users own their identities and data. And most importantly,
              The View Point Site does not save user data.
            </p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <h2>Blockstack ID</h2>
            <p>
              Blockstack ID provides user-controlled login and storage that
              enable you to take back control of your identity and data.
              It's blockchain-based security and encryption.
            </p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <h2>No censorship</h2>
            <p>
              Powered by Blockstack, you retain ownership of your identity and data.
              The goal is to give control to the user, not the application.
              <br />...
            </p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <h2>No Tracking</h2>
            <p>
              No 3rd party trackers are injected into the view point site.
              No trackers means no specialized ads or data usage without your consent.
              Ad free!<br />...
            </p>
          </Paper>
        </Grid>
        <Box className={classes.box}>
          <h3>
            Profiles are easy to create once you sign in! You can edit your profile
            by adding a small description about yourself, update your profile
            avatar's image, etc.
          </h3>
        </Box>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h3>What is Blockstack?</h3>
            <p>
              Blockstack is a new internet for decentralized apps that you access
              through the Blockstack Browser. With Blockstack, there is a new world
              of apps that let you own your data and maintain your privacy,
              security and freedom.
            </p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h3>What is gaia and how is data "secured"?</h3>
            <p>
              The Blockstack team has developed a decentralized high-performance
              storage system to allow users to store their data wherever they please.
              They have also created the foundation to allow users to encrypt
              and decrypt their data.
            </p>
          </Paper>
        </Grid>
        <Box className={classes.box}>
          <h3>
            Your viewpoints are not limited in characters length; Nevertheless,
            try to keep them short and to the point.
          </h3>
        </Box>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <h3>
            For longer posts / blogs we recomend
            Airtext (https://airtext.xyz) and Sigle (https://app.sigle.io) which are
            also powered by Blockstack and are linked to your profile here on
            The View Point Site.<br />(We will add more choices in the near future...)
          </h3>
          </Paper>
        </Grid>
        <Box my={3} className={classes.box}>
          <h2>
            Please contribute to our open-source project and / or send your thanks
            and support by any donation that you can make. Thank you.
          </h2>
        </Box>
      </Grid>
    </Container>
  )
}
