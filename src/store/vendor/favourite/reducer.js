// favouriteReducer.js
import {
    GET_FAVOURITE_LIST,
    GET_FAVOURITE_LIST_SUCCESS,
    GET_FAVOURITE_LIST_FAIL,
    DELETE_FAVOURITE_PRODUCT_SUCCESS,
    DELETE_FAVOURITE_PRODUCT_FAIL
} from './actionTypes';

const INIT_STATE = {
    favourite: [],
    favouriteerror: null,
    favouriteloading: false,
    favouritesuccess: false,
    favouriteupdate: null
};

const favouriteReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        // Get Favourite List
        case GET_FAVOURITE_LIST:
            return {
                ...state,
                favouriteloading: true,
                favouritesuccess: false,
                favouriteerror: null,
            };
        case GET_FAVOURITE_LIST_SUCCESS:
            return {
                ...state,
                favouriteloading: false,
                favourite: action.payload,
                favouritesuccess: true,
                favouriteerror: null,
            };
        case GET_FAVOURITE_LIST_FAIL:
            return {
                ...state,
                favouriteloading: false,
                favouritesuccess: false,
                favouriteerror: action.payload,
            };

        //Delete Favourite Product
        case DELETE_FAVOURITE_PRODUCT_SUCCESS:
            return {
                ...state,
                favouritesuccess: true,
                favouriteproduct: [action.payload, ...state.favouriteproduct]
            };

        case DELETE_FAVOURITE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload,
                favouritesuccess: false,
            };

        default:
            return state;
    }
};

export default favouriteReducer;