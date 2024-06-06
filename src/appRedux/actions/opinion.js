import axios from 'axios'

import { authToken } from './Auth.js';
import {
    OPINIONS_ADD_SUCCESS,
    OPINION_LOAD_ITEM
} from '../../constants/ActionTypes';
const apiUrl = process.env.REACT_APP_SPLIIK_API + '/opinions'

export const addOpinion = (opinion, slug) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify(opinion);

    return axios
        .post(`${apiUrl}/${slug}`, body, config, authToken(localStorage.jwt))
        .then(res => {

            dispatch({
                type: OPINIONS_ADD_SUCCESS,
                data: res.data
            })
        }

        )

};

export const getOpinion = (slug) => dispatch => {
    return axios
        .get(`${apiUrl}/${slug}`, authToken(localStorage.jwt))
        .then(res => {
            dispatch({
                type: OPINION_LOAD_ITEM,
                opinions: res.data
            })
        })
}