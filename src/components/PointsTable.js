import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useConfirm } from 'material-ui-confirm'
import {
  Table, TableBody, TableRow, TableCell, TableFooter, TablePagination,
  TableContainer, Paper, IconButton, CircularProgress as Spinner
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { POINTS_FILENAME } from 'assets/constants'
import PointDialog from 'components/PointDialog'
import Pagination from 'components/Pagination'
import EditForm from 'components/EditForm'
import _ from 'lodash'

const useStyles = makeStyles({
  table: {
    minWidth: 260,
  },
  buttonProgress: {
    color: 'red',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

const PointsTable = (props) => {
  const classes = useStyles()
  const confirm = useConfirm()
  const { hub, points, isOwner, userSession, updatePoints } = props

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(false)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, points.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => { setPage(newPage) }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleDelete = async (pointId) => {
    const filteredPoints = _.filter(points, (point) => point.id !== pointId)

    await confirm({
      title: 'Are you sure you want to delete your view point?',
      description: 'This action is permanent!',
      confirmationButtonProps: { color: 'secondary' }
    }).then(() => {
      if (!loading) {
        setLoading(true)
        userSession.putFile(
          POINTS_FILENAME,
          JSON.stringify(filteredPoints),
          { encrypt: false }
        ).catch(error => { console.log(error.message) })

        userSession.deleteFile(`point-${pointId}.json`)
          .catch(err => { console.log(err.message) })
      }
    }).then(() => {
      updatePoints(filteredPoints)
      setLoading(false)
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? points.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : points
          ).map(row => (
            <TableRow key={row.id}>
              <TableCell>
                <PointDialog id={row.id} hub={hub} title={row.title} />
              </TableCell>
              <TableCell align="right">
                {
                  isOwner &&
                  <>
                    <EditForm
                      id={row.id}
                      points={points}
                      userSession={userSession}
                      updatePoints={updatePoints}
                    />
                    <IconButton
                      size="small"
                      color="secondary"
                      aria-label="delete"
                      onClick={() => {handleDelete(row.id)}}
                    >
                      <DeleteForeverIcon fontSize="small" />
                      {
                        loading &&
                        <Spinner size={24} className={classes.buttonProgress} />
                      }
                    </IconButton>
                  </>
                }
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 59 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
              colSpan={2}
              count={points.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{inputProps: { 'aria-label': 'rows per page' }}}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={Pagination}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default PointsTable
