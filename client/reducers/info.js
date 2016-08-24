import * as c from '../constants/Info'

export default function info(state = {
    dimensions: {
        height: document.body.clientWidth - c.RIGHT_OFFSET,
        width: window.innerHeight
    }
}, { type, payload }) {
    switch(type) {
        case c.RESIZE:
            return Object.assign({}, state, {
                dimensions: payload
            })
        default: return state
    }
}
