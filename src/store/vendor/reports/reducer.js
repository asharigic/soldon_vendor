// reportsReducer.js
import {
    GET_SALES_REPORT_LIST,
    GET_SALES_REPORT_LIST_SUCCESS,
    GET_SALES_REPORT_LIST_FAIL,
} from './actionTypes';

const INIT_STATE = {
    reports: [],
    reportserror: null,
    reportsloading: false,
    reportssuccess: false,
    reportsupdate: null
};

const reportsReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        // Get Sales Report List
        case GET_SALES_REPORT_LIST:
            return {
                ...state,
                reports: action.payload,
                reportsloading: true,
                reportssuccess: false,
                reportserror: null,
            };
        case GET_SALES_REPORT_LIST_SUCCESS:
            return {
                ...state,
                reportsloading: false,
                reports: action.payload,
                reportssuccess: true,
                reportserror: null,
            };
        case GET_SALES_REPORT_LIST_FAIL:
            return {
                ...state,
                reportsloading: false,
                reportssuccess: false,
                reportserror: action.payload,
            };

        default:
            return state;
    }
};

export default reportsReducer;