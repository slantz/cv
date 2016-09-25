import * as LANDING_CONSTANTS from '../constants/Landing'
import * as DOM_CONSTANTS from '../constants/Dom'

export default function landing(state = {
    backInBlack: false
}, { type }) {
    switch(type) {
        case LANDING_CONSTANTS.BACK_IN_BLACK:
            return Object.assign({}, state, {
                backInBlack: state.backInBlack === DOM_CONSTANTS.CLASS_BACK_IN_BLACK
                    ? ''
                    : DOM_CONSTANTS.CLASS_BACK_IN_BLACK
            });
        default: return state
    }
}
