// This makes every API response to return Promise object.
function callApi() {
  return new Promise(function(resolve, reject) {
    console.info("You will be signed in now.");
    window.firebase.auth().signInAnonymously().then(function(success) {
      console.info("You've been successfully signed in. Trying to fetch data")
      window.firebase.database().ref('/').once('value', function(snapshot) {
        console.info("Data sucessfully fetched.");
        resolve(Object.assign({},
          snapshot.val()
        ));
      });
    }, function(error) {
      reject("[%d]: happened cuz of: [%s]", error.code, error.message);
    });
  });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { types } = callAPI

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi().then(
    response => next(actionWith({
      payload: response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      payload: {
        failed: true
      }
    }))
  )
}
