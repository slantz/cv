import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import user from './user'
import landing from './landing'
import worldMap from './worldMap'

export default combineReducers({
  user,
  landing,
  worldMap,
  routing,
  form: formReducer
})
