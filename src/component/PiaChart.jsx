import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { piaConst } from '../constants'
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

export default function PiaChart({ selectedRange }) {
  const classes = useStyles()
  const [PiaData, setPiaData] = useState([])
  const [loading, setLoading] = useState()

  const randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1))
  const data = {
    labels: PiaData.map((item) => item.advertiserId),
    datasets: [
      {
        label: 'Pia',
        data: PiaData.map((item) => item.CM001_percent),
        color: 'rgba(75,192,192,1)',
        backgroundColor: PiaData.map(
          (item) =>
            `rgb(
              ${randomBetween(0, 255)},
              ${randomBetween(0, 255)},
              ${randomBetween(0, 255)})`
        ),
        hoverOffset: 4,
      },
    ],
  }

  useEffect(() => {
    let mounted = true
    piaConst.chartObject.requestParam.dateRange = selectedRange
    if (selectedRange) {
      setLoading(true)
      getData(piaConst).then((res) => {
        if (mounted) {
          setPiaData(res.data.result.data)
          setLoading(false)
        }
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

  return (
    <Card className={classes.root}>
      <CardContent>
        <Doughnut data={data} />
      </CardContent>
    </Card>
  )
}
