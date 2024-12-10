// walletReducer.js
import {
    GET_WALLET_LIST,
    GET_WALLET_LIST_SUCCESS,
    GET_WALLET_LIST_FAIL,
    GET_WALLET_CHART_DATE_LIST,
    GET_WALLET_CHART_DATE_LIST_SUCCESS,
    GET_WALLET_CHART_DATE_LIST_FAIL,
    GET_WALLET_CHART_LIST,
    GET_WALLET_CHART_LIST_SUCCESS,
    GET_WALLET_CHART_LIST_FAIL
} from './actionTypes';

const INIT_STATE = {
    wallet: [],
    walletchart: [],
    walletchartdate: [],
    error: null,
    loading: false,
    chartloading: false,
    success: false
};

const walletReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        // Get Wallet List
        case GET_WALLET_LIST:
            return {
                ...state,
                wallet: action.payload,
                loading: true,
                success: false,
                error: null,
            };
        case GET_WALLET_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                wallet: action.payload,
                success: true,
                error: null,
            };
        case GET_WALLET_LIST_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };

        // Get Wallet Chart Date List
        case GET_WALLET_CHART_DATE_LIST:
            return {
                ...state,
                walletchartdate: action.payload,
                loading: true,
                success: false,
                error: null,
            };
        case GET_WALLET_CHART_DATE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                walletchartdate: action.payload,
                success: true,
                error: null,
            };
        case GET_WALLET_CHART_DATE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };

        // Get Wallet Chart List
        case GET_WALLET_CHART_LIST:
            return {
                ...state,
                walletchart: action.payload,
                chartloading: true,
                success: false,
                error: null,
            };
        case GET_WALLET_CHART_LIST_SUCCESS:
            return {
                ...state,
                chartloading: false,
                walletchart: action.payload,
                success: true,
                error: null,
            };
        case GET_WALLET_CHART_LIST_FAIL:
            return {
                ...state,
                chartloading: false,
                success: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default walletReducer;