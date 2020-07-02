import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import todo from './todo'
import user from './user'

export default combineReducers({ alert, auth, todo, user })
