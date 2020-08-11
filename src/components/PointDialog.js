import React, { useState, useEffect, useRef } from 'react'
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  IconButton, Link, CircularProgress
} from '@material-ui/core'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  action: {
    flexGrow: 1,
  },
}))

const PointDialog = (props) => {
  const classes = useStyles()
  const { id, hub, title, username } = props
  const [point, setPoint] = useState({})
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const createMarkup = htmlText => { return {__html: htmlText} }

  const handleClickOpen = async () => {
    setOpen(true)
    if (!loading) {
      setLoading(true)
      await fetch(hub + `point-${id}.json`)
        .then(response => { return response.json() })
        .then(data => {
          setPoint(data)
          setLoading(false)
        })
        .catch(err => { console.log(err.message) })
    }
  }

  const handleClose = () => { setOpen(false) }

  const descriptionElementRef = useRef(null)
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <>
      <IconButton
        size="small"
        color="inherit"
        onClick={handleClickOpen}
      >
        <VisibilityOutlinedIcon fontSize="small" />
      </IconButton>
      <Link color='textPrimary' onClick={handleClickOpen} href='#'>{title}</Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" className={classes.title}>
          {title}
        </DialogTitle>
        <DialogContent dividers={true}>
          {
            loading ?
            <CircularProgress size={68} /> :
            <pre>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                dangerouslySetInnerHTML={createMarkup(point.description)}
                tabIndex={-1}
              />
            </pre>
          }
        </DialogContent>
        <DialogActions>
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <ThumbDownOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="inherit"
            onClick={handleClose}
            component={RouterLink}
            className={classes.action}
            to={`/${username}/point/${id}`}
          >
            <OpenInBrowserIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <ThumbUpOutlinedIcon fontSize="small" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PointDialog
