import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import landing from './landing'
import info from './info'

export default combineReducers({
  landing,
  info,
  routing
})
