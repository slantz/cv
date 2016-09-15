import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as infoActions from '../actions/infoActions'
import InfoSection from './InfoSection'
import * as CONSTANTS from '../constants/Info'

class Info extends Component {
  constructor(props) {
    super(props)
  }

  getCVInfo = () => {
    const { infoActions: { loadCvData } } = this.props
    loadCvData()
  }

  componentWillMount() {
    this.getCVInfo()
  }

  componentWillReceiveProps(nextProps) {
    this.getCVInfo()
  }

  render() {
    const { info: { data } } = this.props

    return (
      <article id="cv-info">
        <header>
          <img className="cv-avatar" src={CONSTANTS.AVATAR_LINK} width="150px" height="150px" alt="it's me" />
          <h1>CV TEXT</h1>
        </header>
        <section id="cv-info__body" style={{'width': '100vw'}}>
          <InfoSection info={data} />
        </section>
        <footer></footer>
      </article>
    )
  }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
  return {
    info: state.info
  }
}


// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
  return {
    infoActions: bindActionCreators(infoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
