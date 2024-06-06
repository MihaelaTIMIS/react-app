import {
    SCREEN_NEXT,
    SET_NEXT_VALUE
} from '../../constants/ActionTypes';

const initialState = {
    nextOk: true,
    current: 0
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SCREEN_NEXT:
            return {
                ...state,
                current: action.current
            }
        case SET_NEXT_VALUE
            :
            return {
                ...state,
                nextOk: action.nextOk,
            }
        default:
            return state;
    }
}