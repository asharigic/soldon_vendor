// ecommerceSaga.js
import { call, put, takeEvery } from 'redux-saga/effects'; // Add takeEvery import

import { GET_TERM_DROP_DOWN_LIST,ADD_TERM } from './actionTypes';
import { getTermDropDownListSuccess, getTermDropDownListFail,addTermSuccess, addTermFail } from './actions';

import axiosInstance from '../../axiosInstance';

//Get Terms Drop Down
function* fetchDropDownTerms() {
  try {
    const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}public/term/terms-list`);
    yield put(getTermDropDownListSuccess(response.data));
  } catch (error) {
    yield put(getTermDropDownListFail(error.message));
  }
};
//add new attributes
function* onAddNewTerm({ payload: { term } }) {
  try {
    const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}public/term/create`, term);
    yield put(addTermSuccess(response));
    // navigate('/terms');
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "";
    yield put(addTermFail(errorMessage));
  }
}

// Watcher saga - listen for GET_TERMS action
function* termsSaga() {

  yield takeEvery(GET_TERM_DROP_DOWN_LIST, fetchDropDownTerms);
  yield takeEvery(ADD_TERM, onAddNewTerm);
}

export default termsSaga;
