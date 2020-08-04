import React, { useState, useEffect, useRef } from 'react'
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  IconButton, Link, CircularProgress
} from '@material-ui/core'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'

const PointDialog = (props) => {
  const { id, hub, title } = props
  const [point, setPoint] = useState({})
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

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
        aria-label="view"
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
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={true}>
          {
            loading ?
            <CircularProgress size={68} /> :
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {point.description}
            </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          <IconButton
            size="small"
            color="inherit"
            aria-label="like"
            onClick={handleClose}
          >
            <ThumbUpOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="inherit"
            aria-label="dislike"
            onClick={handleClose}
          >
            <ThumbDownOutlinedIcon fontSize="small" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PointDialog
