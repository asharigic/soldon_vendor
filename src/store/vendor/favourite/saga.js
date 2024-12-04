// favouriteSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE_FAVOURITE_PRODUCT, GET_FAVOURITE_LIST } from './actionTypes';
import { getFavouriteListSuccess, getFavouriteListFail, deleteFavouriteProductSuccess, deleteFavouriteProductFail } from './actions';
import axiosInstance from '../../axiosInstance';

//Get Favourite List
function* fetchFavouriteList({ payload: { seachproduct, page } }) {
    try {
        const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}vendor/product/favorite-product-list?page=${page}`, seachproduct);
        
        yield put(getFavouriteListSuccess(response.data.favorite_products));
    } catch (error) {
        yield put(getFavouriteListFail(error.message));
    }
};

//Delete Favourite Product
function* deleteFavouriteProduct({ payload: { favouriteproduct } }) {
    try {
        const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}vendor/product/add_product_to_favorite/${favouriteproduct}`);
        yield put(deleteFavouriteProductSuccess(response.data));
    } catch (error) {
        yield put(deleteFavouriteProductFail(error.message));
    }
}

function* favouriteSaga() {
    yield takeEvery(GET_FAVOURITE_LIST, fetchFavouriteList);
    yield takeEvery(DELETE_FAVOURITE_PRODUCT, deleteFavouriteProduct);
};

export default favouriteSaga;