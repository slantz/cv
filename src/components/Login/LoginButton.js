import React, { Component } from 'react'
import {Link} from 'react-router'

export default class LoginButton extends Component {
    render() {
        const { user } = this.props
        return (
            <div>
                { !user.name && <Link to='/login'>Login</Link> }
            </div>
        )
    }
}