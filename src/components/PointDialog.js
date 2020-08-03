import React, { useState, useEffect, useRef } from 'react'
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

const PointDialog = (props) => {
  const { id, hub, title } = props
  const [point, setPoint] = useState({})
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    fetch(hub + `point-${id}.json`)
      .then(response => { return response.json() })
      .then(data => { setPoint(data) })
      .catch(err => { console.log(err.message) })
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
        <VisibilityIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {point.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton
            size="small"
            color="inherit"
            aria-label="like"
            onClick={handleClose}
          >
            <ThumbUpIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="inherit"
            aria-label="dislike"
            onClick={handleClose}
          >
            <ThumbDownIcon fontSize="small" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PointDialog