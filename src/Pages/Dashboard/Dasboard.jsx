import React, { useState, useEffect } from 'react'
import { FormControl, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { dateRange } from '../../service/api'

export default function Dashboard() {
  const [range, setRange] = useState({})
  const history = useHistory()
  useEffect(() => {
    dateRange()
      .then((response) => {
        const { status, result } = response.data
        if (status.statusCode === '200') {
          setRange({ ...result })
        }
      })
      .catch((error) => console.log(error))
  }, [])

  const logoutUser = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <div>
      <FormControl>
        <Button variant='outlined' color='primary' onClick={() => logoutUser()}>
          Logout
        </Button>
        {Object.entries(range).map((item) => {
          return item
        })}
      </FormControl>
    </div>
  )
}
