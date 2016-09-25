import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as landingActions from '../actions/LandingActions'
import {Link} from 'react-router'
import * as CORE_CONSTANTS from '../constants/Core';

class Landing extends Component {
    constructor(props) {
        super(props)
    }

    toggleBackInBlack = () => {
        const { landingActions: { toggleBackInBlack } } = this.props
        toggleBackInBlack()
    }

    render() {
        const { backInBlack } = this.props

        return (
            <article id="cv-landing" className={'on-start-screen ' + CORE_CONSTANTS.STRING_SPACE + backInBlack}>
              <div className="cv-logo i-inline-block i-transit-all beforeload">
                <div className="i-edge"></div>
                <Link className="i-inline-block" to='/info'>
                  <h1 className="text i-inline-block">CV</h1>
                </Link>
              </div>
              <h3 className="name i-transit-all i-inline-block">Alex Kobylinski</h3>
                <button onClick={this.toggleBackInBlack}>Back in black</button>
            </article>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        backInBlack: state.landing.backInBlack
    }
}

// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        landingActions: bindActionCreators(landingActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
