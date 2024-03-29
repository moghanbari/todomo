import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateUser, updatePassword } from '../../redux/actions/user'

function Profile({ updateUser, updatePassword, user, alert }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    newPassword: '',
    repeatNewPassword: '',
  })

  const { name, email, newPassword, repeatNewPassword } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmitUpdateProfileForm = (e) => {
    e.preventDefault()

    if (alert.length === 0) {
      updateUser(name)
    }
  }

  const handleSubmitUpdatePasswordForm = (e) => {
    e.preventDefault()

    if (alert.length === 0) {
      updatePassword(newPassword, repeatNewPassword)
    }
  }

  return (
    <main className="profile container mt-100">
      <h1 className="header-h1 mb-40">Profile</h1>
      <form onSubmit={handleSubmitUpdateProfileForm}>
        <div className="two-column-wrapper">
          <div className="col1">
            <label htmlFor="name">Name:</label>
          </div>
          <div className="col2">
            <input
              className="input-field"
              type="text"
              onChange={onChange}
              name="name"
              id="name"
              required
              value={name}
            />
          </div>
          <div className="col1">
            <label htmlFor="email">Email:</label>
          </div>
          <div className="col2">
            <input
              className="input-field"
              type="email"
              disabled
              id="email"
              value={email}
            />
          </div>
        </div>
        <input className="button" type="submit" value="Update" />
      </form>
      <form className="mt-50" onSubmit={handleSubmitUpdatePasswordForm}>
        <p className="mb-40">
          If you wish to change your password just type your new one here:
        </p>
        <div className="two-column-wrapper">
          <div className="col1">
            <label htmlFor="password">New Password:</label>
          </div>
          <div className="col2">
            <input
              className="input-field"
              type="password"
              onChange={onChange}
              name="newPassword"
              id="password"
              required
              minLength="6"
            />
          </div>
          <div className="col1">
            <label htmlFor="repeat-password">Repeat New Password:</label>
          </div>
          <div className="col2">
            <input
              className="input-field"
              type="password"
              onChange={onChange}
              name="repeatNewPassword"
              id="repeat-password"
              required
              minLength="6"
            />
          </div>
        </div>
        <input className="button" type="submit" value="Update Password" />
      </form>
    </main>
  )
}

Profile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  alert: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  alert: state.alert,
})

export default connect(mapStateToProps, {
  updateUser,
  updatePassword,
})(Profile)
