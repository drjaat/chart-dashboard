import React, { useState } from 'react'
import { signIn } from '../../service/api'
import { Input, FormControl, InputLabel, Button } from '@material-ui/core'
import styles from './Login.module.css'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [incorrect, setIncorrect] = useState(false)

  const loginUser = () => {
    setIncorrect(false)
    if (!!email && !!password) {
      setError(false)
      setLoading(true)
      signIn(email, password)
        .then((response) => {
          setLoading(false)
          const { token, statusCode } = response.data
          if (statusCode === '200') {
            localStorage.setItem('token', token)
            history.push('/')
          } else {
            setIncorrect(true)
          }
        })
        .catch((error) => {
          setLoading(false)
          setIncorrect(true)
          console.log(error)
        })
    } else {
      setError(true)
    }
  }
  return (
    <div className={styles.logincontainer}>
      <div className={styles.login}>
        Login
        <FormControl required={true}>
          <InputLabel htmlFor='email' className={styles.MuiFormLabel}>
            Email Address
          </InputLabel>
          <Input
            id='email'
            className={styles.MuiInputBase}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl required={true}>
          <InputLabel htmlFor='password' className={styles.MuiFormLabel}>
            Password
          </InputLabel>
          <Input
            id='password'
            className={styles.MuiInputBase}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        {error && (
          <span className={styles.error}>Please Enter all required Fields</span>
        )}
        {incorrect && (
          <span className={styles.error}>Incorrect Username Password</span>
        )}
        <FormControl>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => loginUser()}
          >
            Login
            {loading && (
              <span className={styles.loader}>
                <CircularProgress disableShrink size={12} />
              </span>
            )}
          </Button>
        </FormControl>
      </div>
    </div>
  )
}
