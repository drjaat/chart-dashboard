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

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)
export { signIn, dateRange, getData }
