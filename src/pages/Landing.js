import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container, Grid, Paper, Box, Typography, Card,
  CardActionArea, CardContent, CardMedia, Link
} from '@material-ui/core'
import { Target } from 'mdi-material-ui'
import qr1 from 'assets/qr1.png'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
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
  card: {
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  media: {
    paddingTop: '80%',
  },
}))

const Landing = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box my={3} className={classes.box}>
            <Typography variant="h5">
              Hello, point viewers and view point creators.
            </Typography>
          </Box>
          <Box my={3} className={classes.box}>
            <Typography variant="h4" component="h1">
              Welcome to the new era of social networking!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h5" component="h2" color="textPrimary">
              The View Point Site is a decentralized social networking application
              powered by blockchain technology via Blockstack <Link
              color="textSecondary" href="https://blockstack.org" target="_blank"
              rel="noopener"> (https://blockstack.org)</Link>
            </Typography>
          </Paper>
        </Grid>
        <Box className={classes.box}>
          <Typography variant="h6" component="h3">
            The View Point Site empowers you to publish your viewpoints,
            thoughts, feelings, etc. online while you, the creator, maintain
            the full control over your content forever and ever... Amin.
          </Typography>
        </Box>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} className={classes.paper}>
            <Target />
            <Typography gutterBottom variant="h5" component="h4" color="textPrimary">
              Decentralized
            </Typography>
            <Typography component="p">
              Decentralized Apps are not controlled by any single authority.
              Users own their identities and data.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} className={classes.paper}>
            <Target />
            <Typography gutterBottom variant="h5" component="h4" color="textPrimary">
              Blockstack ID
            </Typography>
            <Typography component="p">
              Blockstack ID provides user-controlled login and storage that
              enables your full control of your identity and data.
            </Typography>
          </Paper>
        </Grid>
        <Box className={classes.box}>
          <Typography variant="h6" component="h3">
            Profiles are easy to create or update once you sign in. You can edit
            your profile by adding your full name, short bio, upload or update your
            profile's avatar image, choose your storage provider, and do other
            settings.
          </Typography>
        </Box>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} className={classes.paper}>
            <Target />
            <Typography gutterBottom variant="h5" component="h4" color="textPrimary">
              No Censorship
            </Typography>
            <Typography component="p">
              Powered by Blockstack, you retain full control and ownership of
              your identity and data.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} className={classes.paper}>
            <Target />
            <Typography gutterBottom variant="h5" component="h4" color="textPrimary">
              No Tracking
            </Typography>
            <Typography component="p">
              No 3rd party trackers are injected into The View Point Site.
              Also, The View Point Site does not save any user data!
            </Typography>
          </Paper>
        </Grid>
        <Box className={classes.box}>
          <Typography variant="h6" component="h3">
            Your viewpoints are not limited in characters length; Nevertheless,
            try to keep them short, sweet, and to the point.
          </Typography>
        </Box>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="p" color="textPrimary">
              For long posts or blogs we recomend Airtext <Link color="textSecondary"
                href="https://airtext.xyz" target="_blank" rel="noopener"
              > (https://airtext.xyz)</Link> and Sigle <Link color="textSecondary"
                href="https://app.sigle.io" target="_blank" rel="noopener"
              > (https://app.sigle.io)</Link> which are also powered by Blockstack
              and are linked to your profile here on The View Point Site.
              <br />(We will add more choices in the near future...)
            </Typography>
          </Paper>
        </Grid>
        <Box className={classes.box} maxWidth="sm">
          <Typography variant="h6" component="h3" gutterBottom>
            Please contribute to our open-source project on GitHub <Link
            color="textSecondary" href="https://github.com/bissisoft/vps"
            target="_blank" rel="noopener"> (https://github.com/bissisoft/vps)
            </Link> and/or send your thanks.
          </Typography>
        </Box>
      </Grid>
      <Container maxWidth="xs">
        <Card elevation={3} className={classes.card}>
          <Typography variant="button" color="error" component="p" gutterBottom>
            Bitcoin gratefully accepted
          </Typography>
          <CardActionArea>
            <CardMedia className={classes.media} image={qr1} />
          </CardActionArea>
          <CardContent>
            <Typography variant="caption">
              bc1qx0w3m922c9u88al0pq58e6kuens9km7ryv2hqm
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Container>
  )
}

export default Landing
