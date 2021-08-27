import React from 'react'
import { signIn } from '../../service/api'
import { Input, FormControl, InputLabel, Button } from '@material-ui/core'
import styles from './Login.module.css'
import { useHistory } from 'react-router-dom'

export default function Login() {
  const history = useHistory()
  const loginUser = async () => {
    await signIn()
    history.push('/')
  }
  return (
    <div className={styles.logincontainer}>
      <div className={styles.login}>
        Login
        <FormControl>
          <InputLabel htmlFor='email' className={styles.MuiFormLabel}>
            Email Address
          </InputLabel>
          <Input id='email' className={styles.MuiInputBase} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='password' className={styles.MuiFormLabel}>
            Password
          </InputLabel>
          <Input id='password' className={styles.MuiInputBase} />
        </FormControl>
        <FormControl>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => loginUser()}
          >
            Login
          </Button>
        </FormControl>
      </div>
    </div>
  )
}
