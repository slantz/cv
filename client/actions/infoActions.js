import * as c from '../constants/Info'
import { CALL_API } from '../middleware/api'

// Fetches a cv information data from Firebase DV.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchCvData() {
  return {
    [CALL_API]: {
      types: [ c.INFO_REQUEST, c.INFO_SUCCESS, c.INFO_FAILURE ],
      payload: {},
      isFetching: null
    }
  }
}

function shouldFetchCvData(state){
  const isFetching = state.info.isFetching
  const data = state.info.data

  if (isFetching === false) {
    if (Object.keys(data).length === 0) {
      return true;
    } else {
      if (data.failed) {
        // TODO: should probably dispatch some error here
        return false;
      }
    }
  }

  if (isFetching === true) {
    return false;
  }

}

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadCvData() {
  return (dispatch, getState) => {
    if (shouldFetchCvData(getState())) {
      return dispatch(fetchCvData())
    }
    return null;
  }
}
