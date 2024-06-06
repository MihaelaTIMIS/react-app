import axios from 'axios';

import {
    // LOGIN_FAIL,
    // REGISTER_SUCCESS,
    // REGISTER_FAIL,
    LOGOUT_SUCCESS
} from "constants/ActionTypes";


export function authToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}
//se connecter
export const userSignIn = ({ email, password }) => dispatch => {
    //Header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // Request body
    const body = JSON.stringify({ email, password });
    return axios
        .post(process.env.REACT_APP_SPLIIK_API + '/users/login', body, config)
        .then(res => {
            const token = res.data.token;
            localStorage.setItem('jwt', token)
            return res;

        });
};

// se creer un compte
export const userSignUp = ({ email, password, password_confirm, pseudo, languageUser }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ email, password, password_confirm, pseudo, languageUser });
    return axios.post(process.env.REACT_APP_SPLIIK_API + '/users', body, config);
};

export const logout = () => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: LOGOUT_SUCCESS
        });
        resolve();
    });

};