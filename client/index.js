import React from 'react'
import {render} from 'react-dom'
import {syncHistoryWithStore} from 'react-router-redux'
import {IntlProvider} from 'react-intl'
import {configureStore, browserHistory} from './store/configureStore'
import Root from './root'
import * as CONSTANTS from "./constants/Dom";

// todo: remove errorReporter attribute from AppContainer
// once this pull request merged https://github.com/gaearon/react-hot-loader/pull/314
import Redbox from 'redbox-react' // workaround https://github.com/gaearon/react-hot-loader/issues/312#issuecomment-231061904

import {AppContainer} from 'react-hot-loader';

const initialState = ( window && window.__INITIAL_STATE__ ) ? window.__INITIAL_STATE__ : {};
const store = configureStore(initialState)
if (window && window.__INITIAL_STATE__) delete window.__INITIAL_STATE__;

const rootEl = window.document.getElementById(CONSTANTS.ID_ROOT);
const history = syncHistoryWithStore(browserHistory, store)

import './styles/app.scss'

render(
    <IntlProvider locale='en'>
        <AppContainer errorReporter={Redbox}>
            <Root store={store} history={history}/>
        </AppContainer>
    </IntlProvider>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./root', () => {
        const NextRoot = require('./root').default;
        render(
            <IntlProvider locale='en'>
                <AppContainer errorReporter={Redbox}>
                    <NextRoot store={store} history={history}/>
                </AppContainer>
            </IntlProvider>,
            rootEl
        )
    })
}
