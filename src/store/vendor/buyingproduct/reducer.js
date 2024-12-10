//actions.js

import {
    GET_BUYINGHLIST,
    GET_BUYINGHLIST_SUCCESS,
    GET_BUYINGHLIST_FAIL,
    SHOW_BUYINGHPRODUCT,
    SHOW_BUYINGHPRODUCT_SUCCESS,
    SHOW_BUYINGHPRODUCT_FAIL,
    RETURN_BUYINGPRODUCT,
    RETURN_BUYINGPRODUCT_SUCCESS,
    RETURN_BUYINGPRODUCT_FAIL

} from "./actionType";

const initialState = {
    buyingproducts: [],
    showbuyingproducts: null,
    returnproduct: null,
    buyingproductloading: false,
    buyingerror: null,
    successbuyingproduct: false,

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
        //Show Buying Product
        case SHOW_BUYINGHPRODUCT:
            return {
                ...state,
                buyingproductloading: false,
            };

        case SHOW_BUYINGHPRODUCT_SUCCESS:
            return {
                ...state,
                buyingproductloading: false,
                showbuyingproducts: action.payload,
                successbuyingproduct: true
            };

        case SHOW_BUYINGHPRODUCT_FAIL:
            return {
                ...state,
                buyingproductloading: false,
                error: action.payload,
            };
        //Return producrt
        case RETURN_BUYINGPRODUCT:
            return {
                ...state,
                buyingproductloading: true
            };

        case RETURN_BUYINGPRODUCT_SUCCESS:
            return {
                ...state,
                buyingproductloading: false,
                returnproduct: action.payload,
                successbuyingproduct: true
            };

        case RETURN_BUYINGPRODUCT_FAIL:
            return {
                ...state,
                buyingproductloading: false,
                buyingerror: action.payload,
                successbuyingproduct: false,
            };
        default:
            state = { ...state }
    }
    return state
};

export default BuyingProductsReducer;