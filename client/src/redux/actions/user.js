import axios from 'axios'
import { setAlert } from './alert'
import {
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_FAIL,
} from './types'
import setAuthToken from '../../utils/setAuthToken'

export const updateUser = (name) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ name })

  try {
    const res = await axios.put('/api/user', body, config)

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    })
    dispatch(setAlert('User info updated', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: UPDATE_USER_FAIL,
    })
  }
}

export const updatePassword = (newPassword, repeatNewPassword) => async (
  dispatch
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ password: newPassword })

  try {
    if (newPassword !== repeatNewPassword) {
      return dispatch(setAlert('Password fields are not the same', 'danger'))
    }

    const res = await axios.put('/api/user/password', body, config)

    dispatch({
      type: UPDATE_USER_PASSWORD,
      payload: res.data,
    })
    dispatch(setAlert('New password has been set', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: UPDATE_USER_PASSWORD_FAIL,
    })
  }
}
