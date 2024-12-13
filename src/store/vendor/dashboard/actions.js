// walletactions.js
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
} from "./actionTypes";

// Get SOLD List
export const getrecentsoldproductslist = () => ({
    type: GET_RECENT_SOLD_PRODUCT_LISTS
});

export const getrecentsoldproductslistSuccess = (wallet) => ({
    type: GET_RECENT_SOLD_PRODUCT_LISTS_SUCCESS,
    payload: wallet,
});

export const getrecentsoldproductslistListFail = (error) => ({
    type: GET_RECENT_SOLD_PRODUCT_LISTS_FAIL,
    payload: error,
});

// Get DATA SUMMARY List
export const getdataordersummarylist = () => ({
    type: GET_DATA_ORDER_SUMMARY_LIST
});

export const getdataordersummarylistSuccess = (wallet) => ({
    type: GET_DATA_ORDER_SUMMARY_LIST_SUCCESS,
    payload: wallet,
});

export const getdataordersummarylistListFail = (error) => ({
    type: GET_DATA_ORDER_SUMMARY_LIST_FAIL,
    payload: error,
});

//GET SELLING DATA LIST
export const getsellingdatalist = () => ({
    type: GET_SELLING_DATA_LIST
});

export const getsellingdatalistSuccess = (wallet) => ({
    type: GET_SELLING_DATA_LIST_SUCCESS,
    payload: wallet,
});

export const getsellingdatalistListFail = (error) => ({
    type: GET_SELLING_DATA_LIST_FAIL,
    payload: error,
});
