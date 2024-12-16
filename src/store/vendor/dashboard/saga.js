// walletSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import {
    GET_RECENT_SOLD_PRODUCT_LISTS,
    GET_DATA_ORDER_SUMMARY_LIST,
    GET_SELLING_DATA_LIST,

} from './actionTypes';
import {
    getrecentsoldproductslistSuccess,
    getrecentsoldproductslistListFail,
    getdataordersummarylistSuccess,
    getdataordersummarylistListFail,
    getsellingdatalistSuccess,
    getsellingdatalistListFail,


} from './actions';
import axiosInstance from '../../axiosInstance';

// Get sold List
function* fetchsoldproductList() {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/dashboard/recent-sold-products`);
        yield put(getrecentsoldproductslistSuccess(response.data.orders));
    } catch (error) {
        yield put(getrecentsoldproductslistListFail(error.message));
    }
};
// Get order List
function* fetchordersummaryList() {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/dashboard/order-data-summary`);
        yield put(getdataordersummarylistSuccess(response.data));
    } catch (error) {
        yield put(getdataordersummarylistListFail(error.message));
    }
};
// Get selling List
function* fetchsellingsummaryList() {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/dashboard/selling-data-summary`);
      
        yield put(getsellingdatalistSuccess(response.data));
    } catch (error) {
        yield put(getsellingdatalistListFail(error.message));
    }
};
function* DashboardSaga() {
    yield takeEvery(GET_RECENT_SOLD_PRODUCT_LISTS, fetchsoldproductList);
    yield takeEvery(GET_DATA_ORDER_SUMMARY_LIST, fetchordersummaryList);
    yield takeEvery(GET_SELLING_DATA_LIST, fetchsellingsummaryList);
};

export default DashboardSaga;