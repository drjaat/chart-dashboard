import axios from 'axios'
import { baseUrl } from '../constants'

const signIn = (email, password) => {
  return axios.post(`${baseUrl}/signIn`, {
    email,
    password,
    rememberMe: true,
  })
}

const dateRange = () => {
  return axios.post(
    `${baseUrl}/api/v1/getDateRange`,
    { organization: 'DemoTest', view: 'Auction' },
    getHeader()
  )
}

const getData = (obj) => {
  return axios.post(`${baseUrl}/api/v1/getData`, obj, getHeader())
}

const getHeader = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      'x-auth-token': token,
    },
  }
}
export { signIn, dateRange, getData }
