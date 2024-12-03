// ecommerceSaga.js
import { call, put, takeEvery } from 'redux-saga/effects'; // Add takeEvery import
import axios from 'axios';
import {
  GET_ATTRIBUTE_DROP_DOWN,
  ADD_ATTRIBUTE

} from './actionTypes';
import {
  getAttributeDropDownSuccess,
  getAttributeDropDownFail,
  addAttributeSuccess,
  addAttributeFail,
} from './actions';
import axiosInstance from '../../axiosInstance';

function* fetchDropDownAttributes() {
  try {
    const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}public/attribute/attributes-list`);
    yield put(getAttributeDropDownSuccess(response.data));
  } catch (error) {
    yield put(getAttributeDropDownFail(error.message));
  }
};

//add new attributes
function* onAddNewAttribute({ payload: { attribute } }) {
  try {
    const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}public/attribute/create`, attribute);
    yield put(addAttributeSuccess(response));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred while fetching terms.";
    yield put(addAttributeFail(errorMessage));
  }
}
// Watcher saga - listen for GET_TERMS action
function* attributesSaga() {
  yield takeEvery(GET_ATTRIBUTE_DROP_DOWN, fetchDropDownAttributes);
  yield takeEvery(ADD_ATTRIBUTE, onAddNewAttribute);
}

export default attributesSaga;
