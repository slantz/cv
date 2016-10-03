import React, { Component } from 'react'
import * as CORE_CONSTANTS from '../constants/Core'
import * as INFO_CONSTANTS from '../constants/Info'
import {Link} from 'react-router'

export default class InfoHeader extends Component {

    render() {
        const { printInfo } = this.props;

        return (
            <header className="i-pad_block_vertical_top i-relative">
                <Link className="i-inline-block_mid" to="/" title="Go to landing page">
                    <img className="cv-avatar i-inline-block_mid"
                         src={INFO_CONSTANTS.AVATAR_LINK}
                         width={INFO_CONSTANTS.AVATAR_WIDTH}
                         height={INFO_CONSTANTS.AVATAR_HEIGHT}
                         alt={INFO_CONSTANTS.AVATAR_ALT} />
                </Link>
                <h1 className="i-inline-block_mid i-margin_block_horizontal_left">
                    <span className="i-hide-medium">
                        {'| ' + CORE_CONSTANTS.CV + ' | '}
                    </span>
                    {CORE_CONSTANTS.ALEX_KOBYLINSKI}
                </h1>
                <button className="cv-info-print ui-button white-t50 white-text" onClick={printInfo}>{INFO_CONSTANTS.PRINT_TEXT}</button>
            </header>
        )
    }
}
