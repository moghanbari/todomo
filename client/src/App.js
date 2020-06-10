import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Todos from './components/Todos'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={Todos} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Footer />
      </Router>
    )
  }
}

export default App
