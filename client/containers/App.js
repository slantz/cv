import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as LANDING_CONSTANTS from '../constants/Landing'
import * as landingActions from '../actions/LandingActions'
import * as infoActions from '../actions/infoActions'

class App extends Component {
    constructor(props) {
        super(props)
    }

    hideLanding = () => {
        const { landingActions: { hide }} = this.props
        hide()
    }
    
    render() {
        const {info, infoActions, landing: { showLanding }} = this.props
        var path = this.props.location.pathname;
        var segment = path.split('/')[1] || LANDING_CONSTANTS.LANDING;

        return (
            <ReactCSSTransitionGroup id="cv-transition-group" component="section" transitionName="move-away" transitionEnterTimeout={3000} transitionLeaveTimeout={3000}>
                {React.cloneElement(this.props.children, { key: segment })}
            </ReactCSSTransitionGroup>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        info: state.info,
        landing: state.landing
    }
}


// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        infoActions: bindActionCreators(infoActions, dispatch),
        landingActions: bindActionCreators(landingActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
