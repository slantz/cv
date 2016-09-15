import * as c from '../constants/Landing'

export default function landing(state = {
    backInBlack: c.PURPLE
}, { type }) {
    switch(type) {
        case c.BACK_IN_BLACK:
            return Object.assign({}, state, {
                backInBlack: state.backInBlack === c.BLACK ? c.PURPLE : c.BLACK
            });
        default: return state
    }
}
