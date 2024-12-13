// DashboardReducer.js
import {
    GET_RECENT_SOLD_PRODUCT_LISTS,
    GET_RECENT_SOLD_PRODUCT_LISTS_SUCCESS,
    GET_RECENT_SOLD_PRODUCT_LISTS_FAIL,
    GET_DATA_ORDER_SUMMARY_LIST,
    GET_DATA_ORDER_SUMMARY_LIST_SUCCESS,
    GET_DATA_ORDER_SUMMARY_LIST_FAIL,
    GET_SELLING_DATA_LIST,
    GET_SELLING_DATA_LIST_SUCCESS,
    GET_SELLING_DATA_LIST_FAIL
} from './actionTypes';

const INIT_STATE = {
    soldproductdata: [],
    orderdatasummary: [],
    sellingdatasummary: [],
    
    dashboarderror: null,
    dashboardloading: false,
    dashboardsuccess: false,
   
};

const DashboardReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        // Get Wallet List
        case GET_RECENT_SOLD_PRODUCT_LISTS:
            return {
                ...state,
                soldproductdata: action.payload,
                dashboardloading: true,
                dashboardsuccess: false,
                dashboarderror: null,
            };
        case GET_RECENT_SOLD_PRODUCT_LISTS_SUCCESS:
            return {
                ...state,
                dashboardloading: false,
                soldproductdata: action.payload,
                dashboardsuccess: true,
                dashboarderror: null,
            };
        case GET_RECENT_SOLD_PRODUCT_LISTS_FAIL:
            return {
                ...state,
                dashboardloading: false,
                dashboardsuccess: false,
                dashboarderror: action.payload,
            };
        //order data summary

        case GET_DATA_ORDER_SUMMARY_LIST:
            return {
                ...state,
                orderdatasummary: action.payload,
                dashboardloading: true,
                dashboardsuccess: false,
                dashboarderror: null,
            };
        case GET_DATA_ORDER_SUMMARY_LIST_SUCCESS:
            return {
                ...state,
                dashboardloading: false,
                orderdatasummary: action.payload,
                dashboardsuccess: true,
                dashboarderror: null,
            };
        case GET_DATA_ORDER_SUMMARY_LIST_FAIL:
            return {
                ...state,
                dashboardloading: false,
                dashboardsuccess: false,
                dashboarderror: action.payload,
            };

        //selling data summary

        case GET_SELLING_DATA_LIST:
            return {
                ...state,
                sellingdatasummary: action.payload,
                dashboardloading: true,
                dashboarderror: null,
            };
        case GET_SELLING_DATA_LIST_SUCCESS:
            return {
                ...state,
                dashboardloading: false,
                sellingdatasummary: action.payload,
            };
        case GET_SELLING_DATA_LIST_FAIL:
            return {
                ...state,
                dashboarderror: action.payload,
                dashboardloading: false,
            };

        default:
            return state;
    }
};

export default DashboardReducer;