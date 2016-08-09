import React, {Component, PropTypes} from 'react'
import { LoginButton } from '../Login'
import { LogoutButton } from '../Login'

export default class RightPanel extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired
    }

    render() {
        const {user, userActions: {logout}} = this.props
        return (
            <div style={{float: 'right'}}>
                <LoginButton user={user} />
                <LogoutButton user={user} logout={logout} />
            </div>
        )
    }
}
