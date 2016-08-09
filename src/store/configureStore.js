import { applyMiddleware, createStore, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

const logger = createLogger()

const routingMiddleware = routerMiddleware(browserHistory)

export function configureStore(initialState = {}) {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(routingMiddleware, thunk, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ))

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

export { browserHistory }
