import axios from 'axios'
const signIn = (email, password) => {
  return axios.post('/signIn', {
    email,
    password,
    rememberMe: true,
  })
}

const dateRange = () => {
  return axios.post(
    '/api/v1/getDateRange',
    { organization: 'DemoTest', view: 'Auction' },
    getHeader()
  )
}

const getData = (obj) => {
  return axios.post('/api/v1/getData', obj, getHeader())
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
