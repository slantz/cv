import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { login } from '../actions/UserActions'
import { LoginForm } from '../components/Login/'

function select(state, ownProps) {
    const isAuthenticated = state.user.name || false
    const redirect = ownProps.location.query.redirect || '/'
    return {
        isAuthenticated,
        redirect
    }
}

class Settings extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
    };

    componentWillMount() {
        const { isAuthenticated, replace, redirect } = this.props
        if (isAuthenticated) {
            replace(redirect)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isAuthenticated, replace, redirect } = nextProps
        const { isAuthenticated: wasAuthenticated } = this.props

        if ( ! wasAuthenticated && isAuthenticated) {
            replace(redirect)
        }
    }

    componentDidMount() {
        // чтоб не упарываться каждый раз вводом пароля
        // todo: удали это потом
        this.props.login({
            name: 'test@test.test',
            password: 'test'
        })
    }

    handleForgotPassword = (e) => {
        e.preventDefault()
        alert('ахаха, гляньте, он свой пасс забыл')
    }

    handleLogin = (values) => { 
        this.props.login({
            name: values.email,
            password: values.password
        })
    }

    render() {
        return (
            <section>
                <div>подсказка: просто заполните валидно</div>
                <LoginForm onSubmit={this.handleLogin} handleForgotPassword={this.handleForgotPassword} />
            </section>
        )
    }
}

// Эта жуть нужна для redux-auth-wrapper
// гляди https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/basic/components/Login.js#L63
export default connect(select, { login, replace: routerActions.replace })(Settings)
