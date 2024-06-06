import axios from 'axios'

import {

    CATEGORIES_GET_ITEMS,

} from '../../constants/ActionTypes';


export const getCategoriesItems = () => dispatch => {

    axios
        .get(process.env.REACT_APP_SPLIIK_API + '/categories')
        .then(res => {
             dispatch({
                type: CATEGORIES_GET_ITEMS,
                items: res.data
            })
        })

}

export const getCategoriesCache = () => dispatch => {
    axios
        .get(process.env.REACT_APP_SPLIIK_API + '/categories/cache')
        .then(res => {
             dispatch({
                type: CATEGORIES_GET_ITEMS,
                items: res.data
            })
        })

}