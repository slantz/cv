import * as LANDING_CONSTANTS from '../constants/Landing'
import * as DOM_CONSTANTS from '../constants/Dom'
import * as CORE_CONSTANTS from '../constants/Core'

export default function landing(state = {
    backInBlack: ''
}, { type }) {
    switch(type) {
        case LANDING_CONSTANTS.BACK_IN_BLACK:
            let spacedBackInBlack = CORE_CONSTANTS.STRING_SPACE + DOM_CONSTANTS.CLASS_BACK_IN_BLACK
            return Object.assign({}, state, {
                backInBlack: state.backInBlack === spacedBackInBlack
                    ? ''
                    : spacedBackInBlack
            });
        default: return state
    }
}
