import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SomePartOfProfile, SomeOtherPartOfProfile } from '../components/Profile/'
import * as userActions from '../actions/UserActions'

class Profile extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <p>Это профиль {user.name}, чтоб сюда попасть нужно авторизироваться</p>
                <p>Это умный компонент, здесь обрабатываем данные из стора</p>

                <p>А в 'презентационные' компоненты только передаем данные, они нихера сами делать не должны, только отображают</p>
                <SomePartOfProfile />
                <SomeOtherPartOfProfile />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
