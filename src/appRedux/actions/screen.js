import {
    SCREEN_NEXT,
    SET_NEXT_VALUE
} from "../../constants/ActionTypes"


export const screenNext = (current) => dispatch => {
     dispatch({
        type: SCREEN_NEXT,
        current: current
    })
}

export const setNextValue = (value) => dispatch => {
    dispatch({
        type: SET_NEXT_VALUE,
        nextOk: value
    })
}