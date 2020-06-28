import { GET_TODOS, GET_TODOS_FAIL } from '../actions/types'

const initialState = {
  todos: [],
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
      }
    case GET_TODOS_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
