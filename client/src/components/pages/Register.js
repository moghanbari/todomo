import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../redux/actions/alert'
import { register } from '../../redux/actions/auth'
import PropTypes from 'prop-types'

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      register({ name, email, password })
    }
  }

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <section className="register container">
      <h1>Sign Up</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          required
          onChange={(e) => onChange(e)}
        />

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
          minLength="6"
          value={password}
          required
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          minLength="6"
          value={password2}
          required
          onChange={(e) => onChange(e)}
        />
        <input type="submit" className="button register" value="Register" />
        <p className="license-agreement">
          By signing up you accept our license agreement. You can find it here.
          Please fully read it before signing up.
        </p>
      </form>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { setAlert, register })(Register)
