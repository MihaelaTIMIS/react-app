import {
    EXERCICES_GET_ITEMS,
    EXERCICES_ADD_ITEM,
    EXERCICES_ADD_SUCCESS,
    EXERCICES_UPDATED,
    EXERCICES_LOAD_ITEM,
    EXERCICES_DELETE_VIDEO,
    EXERCISE_LOAD_ANSWER,
    EXERCISE_UPDATE_ANSWER
} from './../../constants/ActionTypes'

const initialState = {
    exercice: null,
    exercices: [],
    exercicesOrdered: [],
    answer: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case EXERCICES_GET_ITEMS:
            return {
                ...state,
                exercices: action.exercices
            }
        case EXERCICES_ADD_ITEM:
            return {
                ...state,
                exercices: [...state.exercices],
            }
        case EXERCICES_LOAD_ITEM:
            return {
                ...state,
                exercice: action.exercice
            };
        case EXERCICES_ADD_SUCCESS:
            return {
                ...state,
                exercice: action.exercice,
                //  exercices: [...state.exercices]
            }
        case EXERCICES_UPDATED:
            return {
                ...state,
                exercice: action.exercice,
                // exercice: [action.exercice, ...state.exercice]
            }
        case EXERCISE_LOAD_ANSWER:
            return {
                ...state,
                answer: action.answer
            }
        case EXERCISE_UPDATE_ANSWER:
            return {
                ...state,
                answer: action.answer
            }
        case EXERCICES_DELETE_VIDEO:
            let exercices = state.exercices;
            exercices.forEach((exo, index) => {
                if(action.id === exo.id){
                    let exercice = {...exo, video1: null}
                    exercices[index] = exercice;
                }
            })
            return {
                ...state,
                exercices: exercices
            };
        default:
            return state;
    }
}
