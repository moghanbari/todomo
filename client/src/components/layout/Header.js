import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header style={headerStyle}>
      <Link style={linkStyle} to="/">
        Todos
      </Link>{' '}
      |{' '}
      <Link style={linkStyle} to="Login">
        Login
      </Link>{' '}
      |{' '}
      <Link style={linkStyle} to="Register">
        Register
      </Link>
    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
  textDecoration: 'none',
}

const linkStyle = {
  color: '#fff',
}

export default Header
