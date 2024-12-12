//actions.js

import {
    GET_SELLINGLIST,
    GET_SELLINGLIST_SUCCESS,
    GET_SELLINGLIST_FAIL,
    GET_RETURNORDERLIST,
    GET_RETURNORDERLIST_SUCCESS,
    GET_RETURNORDERLIST_FAIL,
    SHOW_RETURNORDERLIST,
    SHOW_RETURNORDERLIST_SUCCESS,
    SHOW_RETURNORDERLIST_FAIL,
    CREATE_SHIPMENT_ORDER,
    CREATE_SHIPMENT_ORDER_SUCCESS,
    CREATE_SHIPMENT_ORDER_FAIL

} from "./actionType";

const initialState = {
    sellingproducts: [],
    returnorderproducts: null,
    showreturnorderproduct: null,
    shipmentorder: null,
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
        //Get Retun order List
        case GET_RETURNORDERLIST:
            return {
                ...state,
                sellingproductloading: true,
                sellingerror: null,
                successsellingproduct: false,
            };
        case GET_RETURNORDERLIST_SUCCESS:
            return {
                ...state,
                sellingproductloading: false,
                returnorderproducts: action.payload,
                successsellingproduct: true,
            };

        case GET_RETURNORDERLIST_FAIL:
            return {
                ...state,
                sellingerror: action.payload,
                sellingproductloading: false
            };
        //show Retun order List
        case SHOW_RETURNORDERLIST:
            return {
                ...state,
                sellingproductloading: true,
                sellingerror: null,
                successsellingproduct: false,
            };
        case SHOW_RETURNORDERLIST_SUCCESS:
            return {
                ...state,
                sellingproductloading: false,
                showreturnorderproduct: action.payload,
                successsellingproduct: true,
            };

        case SHOW_RETURNORDERLIST_FAIL:
            return {
                ...state,
                sellingerror: action.payload,
                sellingproductloading: false
            };
        //shiment order
        case CREATE_SHIPMENT_ORDER:
            return {
                ...state,
                sellingproductloading: true
            };

        case CREATE_SHIPMENT_ORDER_SUCCESS:
            return {
                ...state,
                sellingproductloading: false,
                showreturnorderproduct: action.payload,
                successsellingproduct: true
            };

        case CREATE_SHIPMENT_ORDER_FAIL:
            return {
                ...state,
                sellingproductloading: false,
                sellingerror: action.payload,
                successsellingproduct: false,
            };

        default:
            state = { ...state }
    }
    return state
};

export default SellingProductReducer;