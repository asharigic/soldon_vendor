//actions.js

import {
   GET_SELLINGLIST,
   GET_SELLINGLIST_SUCCESS,
   GET_SELLINGLIST_FAIL

} from "./actionType";

//Get sellingproducts
export const getSellingList = (seachproduct, page) => ({
    type: GET_SELLINGLIST,
    payload: { seachproduct, page }
})

export const getSellingListSuccess = (seachproduct) => ({
    type: GET_SELLINGLIST_SUCCESS,
    payload: seachproduct,
})

export const getSellingListFail = (error) => ({
    type: GET_SELLINGLIST_FAIL,
    payload: error,
})