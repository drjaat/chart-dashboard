import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dasboard'
import Login from './Pages/Login/Login'
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <PrivateRoute exact path='/'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path='*'>
          <Redirect to='/' />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}

function useAuth() {
  const token = localStorage.getItem('token')
  return !!token
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
