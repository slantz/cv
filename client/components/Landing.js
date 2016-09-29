import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as landingActions from '../actions/LandingActions'
import {Link} from 'react-router'
import * as CORE_CONSTANTS from '../constants/Core'
import LogoShadowed from './LogoShadowed'

class Landing extends Component {
    constructor(props) {
        super(props)
    }

    toggleBackInBlack = () => {
        const { landingActions: { toggleBackInBlack } } = this.props
        toggleBackInBlack()
    }

    render() {
        const { backInBlack, backInBlackButton } = this.props

        return (
            <article id="cv-landing" className={'on-start-screen' + backInBlack}>
              <LogoShadowed amountOfLogos={CORE_CONSTANTS.NUMBER_LOGO_SHADOWED} />
              <div className="cv-logo i-inline-block i-transit-all beforeload">
                <div className="i-edge"></div>
                <Link className="i-inline-block" to='/info'>
                  <h1 className="text i-inline-block">CV</h1>
                </Link>
              </div>
              <h3 className="name i-transit-all i-inline-block">Alex Kobylinski</h3>
                <button className={'cv-landing-back-in-black-button ui-button' + backInBlackButton.className} onClick={this.toggleBackInBlack}>{backInBlackButton.text}</button>
            </article>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        backInBlack: state.landing.backInBlack,
        backInBlackButton: state.landing.backInBlackButton
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
