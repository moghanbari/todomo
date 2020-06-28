import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Alert from './components/layouts/Alert'
import Landing from './components/pages/Landing'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Todos from './components/pages/Todos'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { loadUser } from './redux/actions/auth'

import './App.css'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/todos" component={Todos} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
