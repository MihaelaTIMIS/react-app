import {
    OPINIONS_ADD_SUCCESS,
    OPINION_LOAD_ITEM
} from '../../constants/ActionTypes';


const initialState = {
    opinion: null,
    opinions: [],

};

export default function (state = initialState, action) {
    switch (action.type) {
        case OPINIONS_ADD_SUCCESS:
            return {
                ...state,
                opinion: action.opinion
            };
        case OPINION_LOAD_ITEM:
            return {
                ...state,
                opinions: action.opinions
            }
        default:
            return state;
    }
}