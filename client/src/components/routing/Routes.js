import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Todos from '../pages/Todos'
import Profile from '../pages/Profile'
import Alert from '../layouts/Alert'

const Routes = () => (
  <>
    <Alert />
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/todos" component={Todos} />
      <PrivateRoute exact path="/profile" component={Profile} />
    </Switch>
  </>
)

export default Routes
