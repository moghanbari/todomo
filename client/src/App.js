import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Landing from './components/pages/Landing'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { loadUser } from './redux/actions/auth'
import Routes from './components/routing/Routes'

import './assets/css/reset.css'
import './assets/css/style.css'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Routes component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
