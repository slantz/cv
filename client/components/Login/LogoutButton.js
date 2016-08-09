import React, { Component } from 'react'

export default class LogoutButton extends Component {
    render() {
        const {user, logout} = this.props
        let logoutButton

        if (user && user.name) {
            logoutButton = <div>
                <h2>Twittwars</h2>
                <p>WELCOME</p>
                <b>{user.name}</b>
                <button onClick={logout}>LOGOUT</button>
            </div>
        }

        return (
            <div>
                {logoutButton}
            </div>
        )
    }
}