// favouriteSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_FAVOURITE_LIST } from './actionTypes';
import { getFavouriteListSuccess, getFavouriteListFail } from './actions';
import axiosInstance from '../../axiosInstance';

//Get Favourite List
function* fetchFavouriteList() {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/product/favorite-product-list`);
        yield put(getFavouriteListSuccess(response.data));
    } catch (error) {
        yield put(getFavouriteListFail(error.message));
    }
};

function* favouriteSaga() {
    yield takeEvery(GET_FAVOURITE_LIST, fetchFavouriteList);
};

export default favouriteSaga;