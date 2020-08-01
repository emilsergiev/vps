import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table, TableBody, TableRow, TableCell, TableFooter,
  TablePagination, TableContainer, Paper, IconButton
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditForm from 'components/EditForm'
import Pagination from 'components/Pagination'
import PointDialog from 'components/PointDialog'
import { POINTS_FILENAME } from 'assets/constants'
import _ from 'lodash'

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
})

const PointsTable = (props) => {
  const classes = useStyles()
  const { hub, points, isOwner, userSession, updatePoints } = props

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, points.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => { setPage(newPage) }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleDelete = async (pointId) => {
    const filteredPoints = _.filter(points, (point) => point.id !== pointId)

    await userSession.putFile(
      POINTS_FILENAME,
      JSON.stringify(filteredPoints),
      { encrypt: false }
    )
    .catch(error => { console.log(error.message) })

    await userSession.deleteFile(`point-${pointId}.json`)
      .then(() => { updatePoints(filteredPoints) })
      .catch(err => { console.log(err.message) })
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? points.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : points
          ).map((row) => (
            <TableRow key={row.id ? row.id : '1'}>
              <TableCell>
                <PointDialog id={row.id} hub={hub} title={row.title} />
                &nbsp; {row.title}
              </TableCell>
              <TableCell align="right">
                {
                  isOwner &&
                  <>
                    <EditForm
                      id={row.id}
                      userSession={userSession}
                      points={points}
                      updatePoints={updatePoints}
                    />
                    <IconButton
                      size="small"
                      color="secondary"
                      aria-label="delete"
                      onClick={() => {handleDelete(row.id)}}
                    >
                      <DeleteForeverIcon fontSize="small" />
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
              colSpan={3}
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
