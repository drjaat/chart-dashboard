import React, { useState, useEffect } from 'react'
import { FormControl, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { dateRange } from '../../service/api'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/dark.css'
import styles from './Dashboard.module.css'
import BasicTable from '../../component/BasicTable'
import BarChart from '../../component/BarChart'
import PiaChart from '../../component/PiaChart'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState()
  const [range, setRange] = useState()
  const [loading, setLoading] = useState()
  const history = useHistory()

  const setDate = (date) => {
    if (Array.isArray(date) && date.length > 1) {
      const startDate = date[0].getTime() + ''
      const endDate = date[1].getTime() + ''
      setSelectedRange({ startDate, endDate })
    }
  }

  useEffect(() => {
    setLoading(true)
    dateRange()
      .then((response) => {
        const { status, result } = response.data
        if (status.statusCode === '200') {
          const { startDate, endDate } = result
          setRange({ startDate, endDate })
          setSelectedRange({ startDate, endDate })
          setLoading(false)
        }
      })
      .catch((error) => console.log(error))
  }, [])

  const logoutUser = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }

  const getDate = (start) => {
    if (!range) {
      return new Date().getTime()
    }
    const { startDate, endDate } = range
    return start ? new Date(Number(startDate)) : new Date(Number(endDate))
  }

  const options = {
    maxDate: getDate(false),
    mode: 'range',
    altInputClass: 'hide',
    dateFormat: 'M d Y',
    minDate: getDate(true),
    defaultDate: [getDate(true), getDate(false)],
  }

  if (loading) {
    return (
      <div>
        <CircularProgress disableShrink />
      </div>
    )
  }

  return (
    <div>
      <div>
        <FormControl>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => logoutUser()}
          >
            Logout
          </Button>
        </FormControl>
      </div>
      <div>
        <Flatpickr
          options={options}
          className={styles.flatpickrInput}
          onChange={(dt) => setDate(dt)}
        />
      </div>
      <div className={styles.charts}>
        <BarChart selectedRange={selectedRange} />
        <PiaChart selectedRange={selectedRange} />
        <BasicTable selectedRange={selectedRange} />
      </div>
    </div>
  )
}
