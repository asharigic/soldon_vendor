// reportsSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_SALES_REPORT_LIST } from './actionTypes';
import { getSalesReportListSuccess, getSalesReportListFail } from './actions';
import axiosInstance from '../../axiosInstance';

//Get Sales Report List
function* fetchSalesReportList({ payload: { report } }) {
    try {
        const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}vendor/report/sales-report`, report);
        yield put(getSalesReportListSuccess(response.data));
    } catch (error) {
        yield put(getSalesReportListFail(error.message));
    }
};

function* reportsSaga() {
    yield takeEvery(GET_SALES_REPORT_LIST, fetchSalesReportList);
};

export default reportsSaga;