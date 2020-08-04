import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button, IconButton, TextField, CircularProgress,
  Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { ContentSave } from 'mdi-material-ui'
import { POINTS_FILENAME } from 'assets/constants'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const EditForm = (props) => {
  const classes = useStyles()
  const { id, points, userSession, updatePoints } = props

  const [open, setOpen] = useState(false)
  const [point, setPoint] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNewTitle = event => { setNewTitle(event.target.value) }
  const handleNewDescription = event => { setNewDescription(event.target.value) }

  const handleClickOpen = async () => {
    setOpen(true)
    await userSession.getFile(`point-${id}.json`, {decrypt: false})
      .then(result => { setPoint(JSON.parse(result)) })
      .catch(error => {
        setNewTitle('error message')
        setNewDescription(error.message)
      })
  }

  const handleClose = () => { setOpen(false) }

  useEffect(() => {
    if (point) {
      setNewTitle(point.title)
      setNewDescription(point.description)
    }
  }, [point])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!loading) {
      setLoading(true)
      const date = point.date
      const editDate = new Date().toUTCString()
      const title = newTitle
      const description = newDescription
      // for viewpoints.json
      const params = { id, date, editDate, title }
      // for point-${id}.json
      const detailParams = { ...params, description }

      const editedPointsForIndex = _.map(points, (p) => {
        return p.id === id ? params : p
      })

      await userSession.putFile(
        POINTS_FILENAME,
        JSON.stringify(editedPointsForIndex),
        { encrypt: false }
      ).catch(err => { console.log(err.message) })

      await userSession.putFile(
        `point-${id}.json`,
        JSON.stringify(detailParams),
        { encrypt: false }
      )
      .then(() => {
        updatePoints(editedPointsForIndex)
        setLoading(false)
        handleClose()
      }).catch(e => { console.log(e.message) })
    }
  }

  return (
    <>
      <IconButton
        size="small"
        color="primary"
        aria-label="edit"
        onClick={handleClickOpen}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Edit Your Point</DialogTitle>
          <DialogContent>
            <TextField required fullWidth
              margin="dense"
              id="standard-required"
              label="What's your point?"
              value={newTitle}
              onChange={handleNewTitle}
            />
            <TextField multiline required fullWidth
              id="outlined-multiline-flexible"
              label="Elaborate on your view point..."
              rows={3}
              rowsMax={21}
              value={newDescription}
              onChange={handleNewDescription}
              margin="normal"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              {
                loading &&
                <CircularProgress size={28} className={classes.buttonProgress} />
              }
              <ContentSave /> Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default EditForm
