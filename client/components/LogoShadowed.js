import React, { Component } from 'react'
import * as CORE_CONSTANTS from '../constants/Core'

export default class LogoShadowed extends Component {

    render() {
        const { amountOfLogos } = this.props;

        let logos = Array
            .apply(0, Array(typeof amountOfLogos === 'number' && amountOfLogos > 0
                ? amountOfLogos
                : CORE_CONSTANTS.NUMBER_LOGO_SHADOWED))
            .map(function(){return 0;});

        return (
            <div className="cv-logo_shadowed" aria-hidden="true">
                {logos.map(function(logo, index){
                    return <span className="i-transit-all i-margin_block_vertical_bottom" key={index}>{CORE_CONSTANTS.STRING_SHADOWED}</span>;
                })}
            </div>
        )
    }
}
