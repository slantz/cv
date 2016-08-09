import * as c from '../constants/Landing'

export default function landing(state = {
    showLanding: true
}, { type/*, payload*/ }) {
    switch(type) {
        case c.HIDE_LANDING:
            return Object.assign({}, state, {
                showLanding: false
            })
        default: return state
    }
}
