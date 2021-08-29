import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { barConst } from '../constants'
import { getData } from '../service/api'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
  root: {
    minWidth: '45%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function BarChart({ selectedRange }) {
  const classes = useStyles()
  const [barData, setBarData] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const state = {
    labels: barData.map((item) => item.appSiteId),
    datasets: [
      {
        label: 'Impressions Offered',
        backgroundColor: '#3f51b5',
        color: '#FFFFFF',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: barData.map((item) => item.impressions_offered),
      },
    ],
  }

  useEffect(() => {
    let mounted = true
    setError(false)
    barConst.chartObject.requestParam.dateRange = selectedRange
    if (selectedRange) {
      setLoading(true)
      getData(barConst)
        .then((res) => {
          if (mounted) {
            setBarData(res.data.result.data)
            setLoading(false)
          }
        })
        .catch((e) => {
          setLoading(false)
          setError(true)
          console.log(e)
        })
    }
    return () => (mounted = false)
  }, [selectedRange])

  if (loading) {
    return (
      <div className='progress'>
        <CircularProgress disableShrink />
      </div>
    )
  }

  if (error) {
    return <h4>No Data Found</h4>
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: 'Average Rainfall per month',
              fontSize: 20,
            },
            legend: {
              display: true,
              position: 'right',
            },
          }}
        />
      </CardContent>
    </Card>
  )
}
