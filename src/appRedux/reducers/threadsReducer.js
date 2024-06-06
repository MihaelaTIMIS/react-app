import {
    THREADS_ADD_SUCCESS,
    GET_THREADS,
    GET_ALL_THREADS
} from '../../constants/ActionTypes';

const initialState = {
    thread: null,
    threads: []
};

export default function (state = initialState, action) {
    switch (action.type) {

        case THREADS_ADD_SUCCESS:
            return {
                ...state,
                thread: action.thread
            }
        case GET_THREADS:
            return {
                ...state,
                threads: action.threads
            }
        case GET_ALL_THREADS:
            return {
                ...state,
                threads: action.threads
            }
        default:
            return state;
    }
}