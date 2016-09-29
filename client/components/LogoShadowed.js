import React, { Component } from 'react'
import * as CORE_CONSTANTS from '../constants/Core'

export default class LogoShadowed extends Component {

    render() {
        const { amountOfLogos } = this.props;
        let logos = [];

        logos = Array
            .apply(0, Array(typeof amountOfLogos === 'number' && amountOfLogos > 0
                ? amountOfLogos
                : CORE_CONSTANTS.NUMBER_LOGO_SHADOWED))
            .map(function(){return 0;});

        return (
            <div className="cv-logo_shadowed">
                {logos.map(function(logo, index){
                    return <span className="i-transit-all" aria-hidden="true" key={index}>{CORE_CONSTANTS.STRING_SHADOWED}</span>;
                })}
            </div>
        )
    }
}
