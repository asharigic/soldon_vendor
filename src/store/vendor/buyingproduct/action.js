//actions.js

import {
    GET_BUYINGHLIST,
    GET_BUYINGHLIST_SUCCESS,
    GET_BUYINGHLIST_FAIL

} from "./actionType";

//Get products
export const getBuyingList = (seachproduct, page) => ({
    type: GET_BUYINGHLIST,
    payload: { seachproduct, page }
})

export const getBuyingListSuccess = (seachproduct) => ({
    type: GET_BUYINGHLIST_SUCCESS,
    payload: seachproduct,
})

export const getBuyingListFail = (error) => ({
    type: GET_BUYINGHLIST_FAIL,
    payload: error,
})