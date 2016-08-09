import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import App from './containers/App'
import Login from './containers/Login'
import Profile from './containers/Profile'
import Home from './components/Home'
import NotFound from './components/NotFound'

const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated'
})

// p.s. реакт хот релоад сейчас в консоли при каждом изменении ругается на Warning: [react-router] You cannot change <Router routes>; it will be ignored
// но.. и пошел он нахер, это цена за использование "bleeding edge" версий модулей, оно ничо плохого не делает, лишь в консоль пишет, скоро поправят
export const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='login' component={Login}/>
        <Route path='profile' component={UserIsAuthenticated(Profile)} />
        <Route path='*' component={NotFound} />
    </Route>
)
