//actions.js

import {
    GET_SELLINGLIST,
    GET_SELLINGLIST_SUCCESS,
    GET_SELLINGLIST_FAIL

} from "./actionType";

const initialState = {
    sellingproducts: [],
    sellingproductloading: false,
    sellingerror: null,
    successsellingproduct: false,

}

const SellingProductReducer = (state = initialState, action) => {
    switch (action.type) {
        //Get Product List
        case GET_SELLINGLIST:
            return {
                ...state,
                sellingproductloading: true,
                sellingerror: null,
                successsellingproduct: false,
            };
        case GET_SELLINGLIST_SUCCESS:
            return {
                ...state,
                sellingproductloading: false,
                sellingproducts: action.payload,
                successsellingproduct: true,
            };

        case GET_SELLINGLIST_FAIL:
            return {
                ...state,
                sellingerror: action.payload,
                sellingproductloading: false
            };

        default:
            state = { ...state }
    }
    return state
};

export default SellingProductReducer;