import * as c from '../constants/Info'

export function resize(width, height) {
    return {
        type: c.RESIZE,
        payload: {
            width,
            height
        }
    }
}
