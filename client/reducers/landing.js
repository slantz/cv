import * as LANDING_CONSTANTS from '../constants/Landing'
import * as DOM_CONSTANTS from '../constants/Dom'
import * as CORE_CONSTANTS from '../constants/Core'

let spacedBackInBlack = CORE_CONSTANTS.STRING_SPACE + DOM_CONSTANTS.CLASS_BACK_IN_BLACK
let spacedBlackOrPurple = CORE_CONSTANTS.STRING_SPACE + DOM_CONSTANTS.CLASS_BUTTON_BLACK

export default function landing(state = {
    backInBlack: CORE_CONSTANTS.STRING_EMPTY,
    backInBlackButton: {
        text: DOM_CONSTANTS.INNER_TEXT_BACK_IN_BLACK_DEFAULT,
        className: spacedBlackOrPurple
    },
}, { type }) {
    switch(type) {
        case LANDING_CONSTANTS.BACK_IN_BLACK:
            return Object.assign({}, state, {
                backInBlack: state.backInBlack === spacedBackInBlack
                    ? CORE_CONSTANTS.STRING_EMPTY
                    : spacedBackInBlack,
                backInBlackButton: {
                    text: state.backInBlackButton.text === DOM_CONSTANTS.INNER_TEXT_BACK_IN_BLACK_DEFAULT
                        ? DOM_CONSTANTS.INNER_TEXT_BACK_IN_BLACK_PURPLE
                        : DOM_CONSTANTS.INNER_TEXT_BACK_IN_BLACK_DEFAULT,
                    className: state.backInBlackButton.className === spacedBlackOrPurple
                        ? CORE_CONSTANTS.STRING_SPACE + DOM_CONSTANTS.CLASS_BUTTON_PURPLE
                        : spacedBlackOrPurple
                }
            });
        default: return state
    }
}
