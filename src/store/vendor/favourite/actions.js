//favouriteactions.js
import {
    GET_FAVOURITE_LIST,
    GET_FAVOURITE_LIST_SUCCESS,
    GET_FAVOURITE_LIST_FAIL,
    DELETE_FAVOURITE_PRODUCT,
    DELETE_FAVOURITE_PRODUCT_SUCCESS,
    DELETE_FAVOURITE_PRODUCT_FAIL
} from "./actionTypes";

// Get Favourite List
export const getFavouriteList = () => ({
    type: GET_FAVOURITE_LIST,
});

export const getFavouriteListSuccess = (favourite) => ({
    type: GET_FAVOURITE_LIST_SUCCESS,
    payload: favourite,
});

export const getFavouriteListFail = (error) => ({
    type: GET_FAVOURITE_LIST_FAIL,
    payload: error,
});

//Delete Favourite Product 
export const deleteFavouriteProduct = (favouriteproduct) => ({
    type: DELETE_FAVOURITE_PRODUCT,
    payload: { favouriteproduct },
})

export const deleteFavouriteProductSuccess = (favouriteproduct) => ({
    type: DELETE_FAVOURITE_PRODUCT_SUCCESS,
    payload: favouriteproduct,
})

export const deleteFavouriteProductFail = (error) => ({
    type: DELETE_FAVOURITE_PRODUCT_FAIL,
    payload: error,
})