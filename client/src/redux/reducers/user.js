import {
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_FAIL,
} from '../actions/types'

const initialState = {
  user: [],
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case UPDATE_USER:
    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        user: payload,
        loading: false,
      }
    case UPDATE_USER_FAIL:
    case UPDATE_USER_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
