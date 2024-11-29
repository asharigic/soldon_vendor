//favouriteactions.js
import {
    GET_FAVOURITE_LIST,
    GET_FAVOURITE_LIST_SUCCESS,
    GET_FAVOURITE_LIST_FAIL
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