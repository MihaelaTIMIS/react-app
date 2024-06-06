import axios from 'axios'
import { authToken } from './Auth.js';
import {
    USER_GET_ITEMS,
    USER_UPDATE_ITEM,
    USER_PROFILE_UPDATE_ITEM,
    ACTIVE_USER,
    USER_INFO_PROFILE,
    OWNER_INFO_PROFILE,
    USER_FOLLOWER,
    ANNULATION_FOLLOW,
    USER_FOLLOWED,
    PASSWORD_FORGOT,
    RESET_PASSWORD,
    USER_EARNINGS
} from '../../constants/ActionTypes';

const apiUrl = process.env.REACT_APP_SPLIIK_API + "/users";
const apiUrlUser = process.env.REACT_APP_SPLIIK_API + "/users/user"
const userActive = process.env.REACT_APP_SPLIIK_API + "/users/active"
const viewProfileUser = process.env.REACT_APP_SPLIIK_API + "/users/profile"
const userFollow = process.env.REACT_APP_SPLIIK_API + "/users/userFollower"
const deleteFollow = process.env.REACT_APP_SPLIIK_API + "/users/delete/userFollowed"
const seeUserFollowed = process.env.REACT_APP_SPLIIK_API + "/users/userFollow"
const passwordForgotUrl = process.env.REACT_APP_SPLIIK_API + "/users/forgotPassword"
const passwordResetUrl = process.env.REACT_APP_SPLIIK_API + "/users/resetPassword"


export const getUser = () => dispatch => {
    if (localStorage.jwt) {
        return axios
            .get(`${apiUrl}`, authToken(localStorage.jwt))
            .then(res => {
                dispatch({
                    type: USER_GET_ITEMS,
                    user: res.data
                })
                return res.data;
            })
    } else {
        return new Promise((resolve, reject) => {
            dispatch({
                type: USER_GET_ITEMS,
                user: null
            })
            resolve();
            return null;
        });
    }
}


export const updateUser = (firstname, lastname, pseudo, headline) => dispatch => {

    const formData = new FormData();
    // formData.append('file', files)
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('pseudo', pseudo)
    formData.append('headline', headline)
    // Headers
    const config = {};

    return axios
        .put(`${apiUrl}`, formData, config, authToken(localStorage.jwt))
        .then(res => {
            const data = res.data
            dispatch({
                type: USER_UPDATE_ITEM,
                user: {
                    lastname: data.lastname,
                    firstname: data.firstname,
                    pseudo: data.pseudo,
                    headline: data.headline
                }
            })
        })
}


export const userLanguage = (languageUser) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ languageUser });
    return axios
        .post(process.env.REACT_APP_SPLIIK_API + '/users/language', body, config, authToken(localStorage.jwt))

        .then(res => {
            return res
        })
}

export const updateUserProfile = (user) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(user)
    return axios
        .put(`${apiUrlUser}`, body, config, authToken(localStorage.jwt))
        .then(res => {
            const data = res.data
            dispatch({
                type: USER_PROFILE_UPDATE_ITEM,
                user: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    pseudo: data.pseudo,
                    linkedin:data.linkedin,
                    headline: data.headline
                }
            })
        })
}


export const activeUser = (actived) => dispatch => {
    return axios
        .get(`${userActive}/${actived}`)
        .then(res => {
            dispatch({
                type: ACTIVE_USER,
                userActive: res.data
            })
        })

}

export const userProfile = (slugUser) => dispatch => {
    return axios
        .get(`${viewProfileUser}/${slugUser}`)
        .then(res => {
            dispatch({
                type: USER_INFO_PROFILE,
                profileUser: res.data
            })
        })

}

export const ownerProfile = (slug) => dispatch => {
    dispatch({
        type: OWNER_INFO_PROFILE,
        profileOwner: null,
        loaderOwner: true
    });
    return axios
        .get(`${viewProfileUser}/${slug}`)
        .then(res => {
            dispatch({
                type: OWNER_INFO_PROFILE,
                profileOwner: res.data,
                loaderOwner: false
            })
        })

}

export const iban = (iban) => dispatch => {
    const config = {headers: {'Content-Type': 'application/json'}};
    const body = JSON.stringify({ iban: iban});
    return axios
        .put(process.env.REACT_APP_SPLIIK_API + "/users/iban", body, config, authToken(localStorage.jwt))
        .then(res => {})
}


export const userEarnings = () => dispatch => {
    return axios
        .get(process.env.REACT_APP_SPLIIK_API + "/earnings/sum", authToken(localStorage.jwt))
        .then(res => {
            dispatch({
                type: USER_EARNINGS,
                earnings: res.data
            })
        })
}


export const userFollower = (slug, user) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ user });
    return axios
        .post(`${userFollow}/${slug}`, body, config, authToken(localStorage.jwt))

        .then(res => {
            dispatch({
                type: USER_FOLLOWER,
                followUser: res.data
            })
        })
}

export const annulationFollow = (slug, user) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ user });
    return axios
        .post(`${deleteFollow}/${slug}`, body, config, authToken(localStorage.jwt))
        .then(res => {
            dispatch({
                type: ANNULATION_FOLLOW,
                annulateFollow: res.data
            })
        })
}
export const viewUserFollowed = () => dispatch => {
    return axios
        .get(`${seeUserFollowed}`, authToken(localStorage.jwt))
        .then(res => {
            dispatch({
                type: USER_FOLLOWED,
                userFollowed: res.data
            })
        })
}

export const passwordForgot = (email) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(email);
    return axios
        .post(`${passwordForgotUrl}`, body, config)
        .then(res => {
            dispatch({
                type: PASSWORD_FORGOT,
                passwordForgotUser: res.data,
                resStatus: res.status
            })
        })
}

export const resetPassword = (token, password, confirma_password) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(password, confirma_password)
    return axios
        .post(`${passwordResetUrl}/${token}`, body, config)
        .then(res => {
            dispatch({
                type: RESET_PASSWORD,
                passwordReset: res.data
            })
        })
}
