import * as c from '../constants/Info'

export default function info(state = {
  data: {},
  isFetching: false
}, { type, payload }) {
  switch(type) {
    case c.INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: payload
      })
    case c.INFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        data: payload
      })
    case c.INFO_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        data: {}
      })
    default: return state
  }
}
