import {
    CATEGORIES_GET_ITEMS,
} from '../../constants/ActionTypes';


const initialState = {
    items: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CATEGORIES_GET_ITEMS:
            return {
                ...state,
                items: action.items
            };
        
        default:
            return state;
    }
}