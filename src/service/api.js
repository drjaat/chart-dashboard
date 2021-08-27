import axios from 'axios'
const signIn = (email = 'candidate@sigmoid.com', password = 'Sigmoid#123') => {
  axios
    .post('/signIn', {
      email,
      password,
      rememberMe: true,
    })
    .then((response) => {
      const { token, statusCode } = response.data
      if (statusCode === '200') {
        localStorage.setItem('token', token)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const dateRange = () => {
  //https://sigviewauth.sigmoid.io/api/v1/getDateRange
  const token = localStorage.getItem('token')
  return axios.post(
    '/api/v1/getDateRange',
    { organization: 'DemoTest', view: 'Auction' },
    {
      headers: {
        'x-auth-token': token,
      },
    }
  )
}

export { signIn, dateRange }
