import axios from 'axios'

import {

    SUBCATEGORIES_GET_ITEMS,
    SUBCATEGORIES_ALL_GET_ITEMS

} from '../../constants/ActionTypes';

const subCategoryUrl = process.env.REACT_APP_SPLIIK_API + '/subCategories'

export const getSubCategories = (id) => dispatch => {
    axios
        .get(`${subCategoryUrl}/${id}`)
        .then(res => {
            dispatch({
                type: SUBCATEGORIES_GET_ITEMS,
                subCategories: res.data
            })
        })

}

export const getSubCategoriesItems = () => dispatch => {
    axios
        .get(`${subCategoryUrl}`)
        .then(res => {
            dispatch({
                type: SUBCATEGORIES_ALL_GET_ITEMS,
                subCategories: res.data
            })
        })

}