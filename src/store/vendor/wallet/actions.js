// walletactions.js
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
} from "./actionTypes";

// Get Wallet List
export const getWalletList = () => ({
    type: GET_WALLET_LIST
});

export const getWalletListSuccess = (wallet) => ({
    type: GET_WALLET_LIST_SUCCESS,
    payload: wallet,
});

export const getWalletListListFail = (error) => ({
    type: GET_WALLET_LIST_FAIL,
    payload: error,
});

// Get Wallet Chart Date List
export const getWalletChartDateList = (wallet) => ({
    type: GET_WALLET_CHART_DATE_LIST,
    payload: { wallet }
});

export const getWalletChartDateListSuccess = (wallet) => ({
    type: GET_WALLET_CHART_DATE_LIST_SUCCESS,
    payload: wallet,
});

export const getWalletChartDateListFail = (error) => ({
    type: GET_WALLET_CHART_DATE_LIST_FAIL,
    payload: error,
});

// Get Wallet Chart List
export const getWalletChartList = (wallet) => ({
    type: GET_WALLET_CHART_LIST,
    payload: { wallet }
});

export const getWalletChartListSuccess = (wallet) => ({
    type: GET_WALLET_CHART_LIST_SUCCESS,
    payload: wallet,
});

export const getWalletChartListFail = (error) => ({
    type: GET_WALLET_CHART_LIST_FAIL,
    payload: error,
});