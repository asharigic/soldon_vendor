// walletSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_WALLET_CHART_DATE_LIST, GET_WALLET_CHART_LIST, GET_WALLET_LIST } from './actionTypes';
import { getWalletListSuccess, getWalletListListFail, getWalletChartListSuccess, getWalletChartListFail, getWalletChartDateListSuccess, getWalletChartDateListFail } from './actions';
import axiosInstance from '../../axiosInstance';

// Get Wallet List
function* fetchWalletList() {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/wallet/show`);
        yield put(getWalletListSuccess(response.data));
    } catch (error) {
        yield put(getWalletListListFail(error.message));
    }
};

// Get Wallet List
function* fetchWalletChartDateList() {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/wallet/get-filter-data`);
        yield put(getWalletChartDateListSuccess(response.data));
    } catch (error) {
        yield put(getWalletChartDateListFail(error.message));
    }
};

// Get Wallet Chart List
function* fetchWalletChartList({ payload: { wallet } }) {
    try {
        const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}vendor/wallet/earnings-data`, wallet);
        yield put(getWalletChartListSuccess(response.data));
    } catch (error) {
        yield put(getWalletChartListFail(error.message));
    }
};

function* walletSaga() {
    yield takeEvery(GET_WALLET_LIST, fetchWalletList);
    yield takeEvery(GET_WALLET_CHART_DATE_LIST, fetchWalletChartDateList);
    yield takeEvery(GET_WALLET_CHART_LIST, fetchWalletChartList);
};

export default walletSaga;