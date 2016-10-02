import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as infoActions from '../actions/infoActions'
import InfoSection from './InfoSection'
import InfoHeader from './InfoHeader'
import * as INFO_CONSTANTS from '../constants/Info'
import * as CORE_CONSTANTS from '../constants/Core'

class Info extends Component {
  constructor(props) {
    super(props)
  }

  getCVInfo = () => {
    const { infoActions: { loadCvData } } = this.props
    loadCvData()
  }

  printInfo = () => {
    window.print();
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
      <article id="cv-info" className="cv-info">
        <div className="cv-info-background i-pad_block_horizontal">
            <InfoHeader printInfo={this.printInfo} />
            <section id="cv-info__body" className="cv-info__body i-pad_block_vertical">
                <InfoSection info={data} />
            </section>
        </div>
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
