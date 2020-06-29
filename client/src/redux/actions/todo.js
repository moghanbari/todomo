import axios from 'axios'
import {
  GET_TODOS,
  GET_TODOS_FAIL,
  ADD_TODO,
  ADD_TODO_FAIL,
  UPDATE_TODO,
  UPDATE_TODO_FAIL,
  REMOVE_TODO,
  REMOVE_TODO_FAIL,
} from './types'
import setAuthToken from '../../utils/setAuthToken'
import { setAlert } from './alert'

export const getTodos = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/todo')

    dispatch({
      type: GET_TODOS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_TODOS_FAIL,
    })
  }
}

export const addTodo = (text) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ text })

  try {
    const res = await axios.post('/api/todo', body, config)

    dispatch({
      type: ADD_TODO,
      payload: res.data,
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: ADD_TODO_FAIL,
    })
  }
}

export const updateTodo = (id, text, completed) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ id, text, completed })

  try {
    const res = await axios.put(`/api/todo/${id}`, body, config)

    dispatch({
      type: UPDATE_TODO,
      payload: res.data,
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: UPDATE_TODO_FAIL,
    })
  }
}

export const removeTodo = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.delete(`/api/todo/${id}`)

    dispatch({
      type: REMOVE_TODO,
      payload: { id, msg: res.data.msg },
    })
  } catch (err) {
    dispatch({
      type: REMOVE_TODO_FAIL,
    })
  }
}
