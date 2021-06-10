import {
  GET_TODOS,
  GET_TODOS_FAIL,
  ADD_TODO,
  ADD_TODO_FAIL,
  UPDATE_TODO,
  UPDATE_TODO_FAIL,
  REMOVE_TODO,
  REMOVE_TODO_FAIL
} from '../actions/types'

const initialState = {
  todos: [],
  loading: true
}

const todo = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false
      }
    case ADD_TODO:
      state.todos.unshift(payload)
      return {
        ...state,
        loading: false
      }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => (todo._id === payload._id ? payload : todo)),
        loading: false
      }
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload.id),
        loading: false
      }
    case GET_TODOS_FAIL:
    case ADD_TODO_FAIL:
    case UPDATE_TODO_FAIL:
    case REMOVE_TODO_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default todo
