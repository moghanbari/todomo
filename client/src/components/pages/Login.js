import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth'
import PropTypes from 'prop-types'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()

    login({ email, password })
  }

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <section className="login container">
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          required
          onChange={(e) => onChange(e)}
        />
        <input
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
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)
