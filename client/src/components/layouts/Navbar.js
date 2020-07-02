import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import PropTypes from 'prop-types'
import logo from '../../assets/logo.png'

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/todos">Todos</Link>
        <Link to="/Profile">Profile</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          Logout
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  )

  return (
    <nav className="navbar container">
      <Link to="/">
        <img className="logo" src={logo} alt="todomo" />
      </Link>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  )
}

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)
