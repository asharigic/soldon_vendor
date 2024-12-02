//actions.js

import {
    GET_BUYINGHLIST,
    GET_BUYINGHLIST_SUCCESS,
    GET_BUYINGHLIST_FAIL

} from "./actionType";

const initialState = {
    buyingproducts: [],
    showbuyingproducts: null,
    buyingproductloading: false,
    buyingerror: null,
    successbuyingproduct: false
}

const BuyingProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        //Get Product List
        case GET_BUYINGHLIST:
            return {
                ...state,
                buyingproducts: action.payload,
                buyingproductloading: true,
                buyingerror: null,
            };
        case GET_BUYINGHLIST_SUCCESS:
            return {
                ...state,
                buyingproductloading: false,
                buyingproducts: action.payload,
            };

        case GET_BUYINGHLIST_FAIL:
            return {
                ...state,
                buyingerror: action.payload,
                buyingproductloading: false
            };
        default:
            state = { ...state }
    }
    return state
};

export default BuyingProductsReducer;