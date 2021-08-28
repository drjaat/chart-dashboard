import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import { table } from '../constants'
import { getData } from '../service/api'

const useStyles = makeStyles({
  table: {
    minWidth: '90%',
  },
})

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {},
}))(TableRow)

export default function BasicTable({ selectedRange }) {
  const classes = useStyles()
  const [rows, setRows] = useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const loadData = useCallback(
    (request) => {
      request.chartObject.requestParam.dateRange = selectedRange
      if (selectedRange) {
        getData(request).then((res) => {
          setRows(res.data.result.data)
        })
      }
    },
    [selectedRange]
  )

  useEffect(() => {
    loadData(table)
  }, [loadData])

  return (
    <Paper className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Publisher</StyledTableCell>
              <StyledTableCell align='right'>
                Impressions Offered
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.publisherId}>
                  <StyledTableCell component='th' scope='row'>
                    {row.publisherId}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.impressions_offered}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 50]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
