import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, LinearProgress } from '@material-ui/core'
import { ContentSave } from 'mdi-material-ui'
import { POINTS_FILENAME } from 'assets/constants'
import { v4 as uuid } from 'uuid'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingRight: 10,
    marginBottom: 20,
  },
  textField: {
    margin: theme.spacing(1,0.5,1,0.5),
  },
  button: {
    margin: theme.spacing(0.5)
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  progress: {
    width: '100%',
    margin: theme.spacing(0.5)
  },
}))

const PointForm = (props) => {
  const classes = useStyles()
  const { points, userSession, updatePoints } = props

  const [saving, setSaving] = useState(false)
  const [values, setValues] = useState({ title:'', description:'' })

  const handleInputChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!saving) {
      setSaving(true)
      const id = uuid()
      const date = new Date().toUTCString()
      const { title, description } = values
      // for viewpoints.json
      const params = { id, date, title }
      // for point-${id}.json
      const detailParams = { ...params, description }
      // HACK: for some reason we cannot overwrite the original file directly :/
      // await userSession.deleteFile(POINTS_FILENAME)
      // should be able to overwrite the original file without deleting it first!
      await userSession.putFile(
        POINTS_FILENAME,
        JSON.stringify([...points, params]),
        { encrypt: false }
      )
      .catch(error => { console.log(error.message) })

      await userSession.putFile(
        `point-${id}.json`,
        JSON.stringify(detailParams),
        { encrypt: false }
      )
      .then(() => {
        setValues({title:'', description:''})
        updatePoints([...points, params])
        setSaving(false)
      })
      .catch(err => { console.log(err.message) })
    }
  }

  return (
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
      <TextField required fullWidth
        id="standard-required"
        label="What's your point? (short title)"
        value={values.title}
        onChange={handleInputChange('title')}
        className={classes.textField}
      />
      <TextField multiline required fullWidth
        id="outlined-multiline-flexible"
        label="Elaborate on your view point... (long description)"
        rows={3}
        rowsMax={33}
        value={values.description}
        onChange={handleInputChange('description')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      {
        ! saving ?
        <>
          <Button fullWidth
            type="submit"
            color="primary"
            variant="contained"
            className={classes.button}
          >
            <ContentSave className={classes.leftIcon} /> Save
          </Button>
        </> :
        <LinearProgress className={classes.progress} />
      }
    </form>
  )
}

export default PointForm
