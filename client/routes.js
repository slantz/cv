import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Landing from './components/Landing'
import Info from './components/Info'

export const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Landing} />
        <Route path='info' component={Info}/>
    </Route>
)
