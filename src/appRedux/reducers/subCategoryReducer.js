import {
    SUBCATEGORIES_GET_ITEMS,
    SUBCATEGORIES_ALL_GET_ITEMS
} from '../../constants/ActionTypes';


const initialState = {
    subCategories: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SUBCATEGORIES_GET_ITEMS:
            return {
                ...state,
                subCategories: action.subCategories
            };
        case SUBCATEGORIES_ALL_GET_ITEMS:
            return {
                subCategories: action.subCategories
            }

        
        default:
            return state;
    }
}