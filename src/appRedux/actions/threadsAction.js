import axios from 'axios'
import { authToken } from './Auth.js';

import {
    THREADS_ADD_SUCCESS,
    GET_THREADS
} from '../../constants/ActionTypes';

const threadsUrl = process.env.REACT_APP_SPLIIK_API + '/discussion';

export const TITLE_AUTHOR = "TITLE_AUTHOR";
export const RESUME_AUTHOR = "RESUME_AUTHOR";
export const PRESENTATION_AUTHOR = "PRESENTATION_AUTHOR"
export const OVERVIEW_HELPER= "OVERVIEW_HELPER"
export const EXERCICE_AUTHOR = "EXERCICE_AUTHOR"
export const EXERCICE_STUDENT = "EXERCICE_STUDENT"

export const getProjectThreads = (slug, type) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    return axios
        .get(`${threadsUrl}/project?slug=${slug}&type=${type}`, config)
        .then(res => {
             dispatch({
                type: GET_THREADS,
                threads: res.data
            })
        })
}

export const getExercisesThreads = (id_exercise, type) => dispatch => {
    return axios
        .get(`${threadsUrl}?id_exercise=${id_exercise}&type=${type}`)
        .then(res => {
            dispatch({
                type: GET_THREADS,
                threads: res.data
            })
        })
}

export const addThread = (thread) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // Request body
    const body = JSON.stringify(thread);
    return axios
        .post(`${threadsUrl}`, body, config,
            authToken(localStorage.jwt))
        .then(res => {
            dispatch({
                type: THREADS_ADD_SUCCESS,
                thread: res.data
            })
        })
}
