//reportsactions.js
import {
    GET_SALES_REPORT_LIST,
    GET_SALES_REPORT_LIST_SUCCESS,
    GET_SALES_REPORT_LIST_FAIL,
} from "./actionTypes";

// Get Sales Report List
export const getSalesReportList = () => ({
    type: GET_SALES_REPORT_LIST,
});

export const getSalesReportListSuccess = (report) => ({
    type: GET_SALES_REPORT_LIST_SUCCESS,
    payload: report,
});

export const getSalesReportListFail = (error) => ({
    type: GET_SALES_REPORT_LIST_FAIL,
    payload: error,
});