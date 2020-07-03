import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth'
import PropTypes from 'prop-types'

const Login = ({ login, isAuthenticated, alert }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()

    if (alert.length > 0) {
      return
    } else {
      login({ email, password })
    }
  }

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/todos" />
  }

  return (
    <main>
      <section className="login container">
        <h1>Login</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            className="input-field"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            required
            onChange={(e) => onChange(e)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            required
            onChange={(e) => onChange(e)}
          />
          <input type="submit" className="button login" value="Login" />
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  alert: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alert: state.alert,
})

export default connect(mapStateToProps, { login })(Login)
