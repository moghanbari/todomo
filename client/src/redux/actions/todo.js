import axios from 'axios'
import { GET_TODOS, GET_TODOS_FAIL } from './types'
import setAuthToken from '../../utils/setAuthToken'

// Get a user's todos
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
