// favouriteReducer.js
import {
    GET_FAVOURITE_LIST,
    GET_FAVOURITE_LIST_SUCCESS,
    GET_FAVOURITE_LIST_FAIL,
    DELETE_FAVOURITE_PRODUCT,
    DELETE_FAVOURITE_PRODUCT_SUCCESS,
    DELETE_FAVOURITE_PRODUCT_FAIL
} from './actionTypes';

const INIT_STATE = {
    favourite: [],
    favouriteproduct: null,
    favouriteloading: false,
    favouritesuccess: false,
    favouriteerror: null,
    favouriteupdate: null,

};

const favouriteReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        // Get Favourite List
        case GET_FAVOURITE_LIST:
            return {
                ...state,
                favourite: action.payload,
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
        case DELETE_FAVOURITE_PRODUCT:
            return {
                ...state,
                favouriteloading: true,
            };
        case DELETE_FAVOURITE_PRODUCT_SUCCESS:
            return {
                ...state,
                // // favouriteproduct: [action.payload, ...state.favouriteproduct],
                favouriteloading: false,
                favouriteproduct: action.payload,
                favouritesuccess: true,
            };

        case DELETE_FAVOURITE_PRODUCT_FAIL:
            return {
                ...state,
                favouriteloading: false,
                favouritesuccess: false,
                favouriteerror: action.payload,
               
            };

        default:
            return state;
    }
};

export default favouriteReducer;