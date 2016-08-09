import * as c from '../constants/WorldMap'

export function resize(width, height) {
    return {
        type: c.RESIZE,
        payload: {
            width,
            height
        }
    }
}
