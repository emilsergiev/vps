import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container, Grid, Paper, Typography, Link,
  Accordion, AccordionDetails, AccordionSummary
} from '@material-ui/core'
import { ChevronDown } from 'mdi-material-ui'

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

  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h4" component="h1">
              Frequently Asked Questions
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            elevation={3}
            expanded={expanded === 'p1'}
            onChange={handleChange('p1')}
          >
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography color="textSecondary">What is Blockstack?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Blockstack is a decentralized computing network and app ecosystem.
                It is a new internet for decentralized apps (dapps) that you access
                through the Blockstack Browser. Blockstack provides user-controlled
                login and storage that enable you to take back control of your
                identity and data. With Blockstack, there is a new world of apps
                that let you own your data and maintain your privacy, security and
                freedom. The dapps in Blockstack protect your digital rights and
                are powered by the Stacks blockchain. Learn more <Link
                color="textSecondary" href="https://blockstack.org" target="_blank"
                rel="noopener"> (https://blockstack.org)</Link>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={3}
            expanded={expanded === 'p2'}
            onChange={handleChange('p2')}
          >
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography color="textSecondary">Why use Blockstack?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                The View Point Site is built on top of Blockstack. The reason
                we chose Blockstack is because it provides the perfect technology
                infrastructure to easily build blockchain apps. Blockstack ecosystem
                abstracts away the blockchain complexity for authentication and
                data storage.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={3}
            expanded={expanded === 'p3'}
            onChange={handleChange('p3')}
          >
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography color="textSecondary">
                Where exactly is my data stored?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                When an ID is created in Blockstack, it issues some storage space.
                This system that handles storage is called Gaia. Any app related
                data for the apps is stored in Gaia. However, Blockstack also
                allows users to choose their own Gaia hub and to configure a back-end
                provider to store data with. <strong>The point is, the user gets
                to choose where their data lives, and Gaia enables applications
                to access it via uniform API.</strong>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={3}
            expanded={expanded === 'p4'}
            onChange={handleChange('p4')}
          >
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography color="textSecondary">What is Gaia?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Gaia is a decentralized high-performance storage system to allow
                users to store their data wherever they please. Gaia works by
                hosting data in one or more existing storage systems of the user's
                choice. These storage systems are typically cloud storage systems.
                Gaia has driver support for S3 and Azure Blob Storage, but the driver
                model allows for other backend support as well. Learn more <Link
                color="textSecondary" href="https://github.com/blockstack/gaia"
                target="_blank" rel="noopener"> (https://github.com/blockstack/gaia)
                </Link>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={3}
            expanded={expanded === 'p5'}
            onChange={handleChange('p5')}
          >
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography color="textSecondary">
                How is data stored in Gaia?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Gaia is not a database! Data is stored in one or many text
                format files (JSON) within the app’s hub in Gaia.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={3}
            expanded={expanded === 'p6'}
            onChange={handleChange('p6')}
          >
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography color="textSecondary">
                Is the data in Gaia always encrypted?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                This depends on the dapp. Developers can choose to store files
                encrypted or in plain text. For the moment The View Point Site
                does not encrypt your viewpoints and the data is stored in your
                Gaia hub in plain text. In the next phase 2 of the developement
                many new features will be implemented and you will have the options
                to encrypt and publish/unpublish or publicly/privetly share your
                viewpoints.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={3}
            expanded={expanded === 'p7'}
            onChange={handleChange('p7')}
          >
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography color="textSecondary">
                Where can I request a feature or report bugs?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                For bug reports and feature requests please create issues on
                GitHub <Link color="textSecondary"
                href="https://github.com/bissisoft/vps/issues" target="_blank"
                rel="noopener"> (https://github.com/bissisoft/vps/issues)</Link>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={3}
            expanded={expanded === 'p8'}
            onChange={handleChange('p8')}
          >
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography color="textSecondary">
                How can I submit feedbacks or make inquiries?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                For general feedbacks and inquiries you may send emails to: <Link
                color="textSecondary" href="mailto:info@bissisoft.com">
                info@bissisoft.com</Link>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Faq
