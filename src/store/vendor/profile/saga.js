// ecommerceSaga.js
import { call, put, takeEvery } from 'redux-saga/effects'; // Add takeEvery import


import { SHOW_PROFILE, EDIT_PROFILE, CHANGE_PASSWORD } from './actionTypes';
import { getProfileSuccess, getProfileFail, editProfileFail, editProfileSuccess, changepasswordSuccess, changepasswordFail } from './actions';

import axiosInstance from '../../axiosInstance';

//show profile
function* fetchShows() {
  try {

    const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/profile/show`);

    if (response && response.data) {

      yield put(getProfileSuccess(response.data));
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {


    const errorMessage = error.response?.data?.message || error.message || "An error occurred while fetching terms.";

    // Dispatch failure action
    yield put(getProfileFail(errorMessage));

  }
}

//update profile
function* onupdateProfile({ payload: user }) {

  try {

    const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}vendor/profile/update`, user);
    if (response.data.status === true) {
      yield put(editProfileSuccess(response));
    }
    else {
      yield put(editProfileFail(response.data.message));
    }



  } catch (error) {

    const errorMessage =
      error.response?.data?.message || "";

    yield put(editProfileFail(errorMessage));
  }

}

///change password

function* onupdatePassword({ payload: user }) {

  try {

    const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}vendor/profile/updatepassword`, user);

    yield put(changepasswordSuccess(response));


  } catch (error) {

    const errorMessage =
      error.response?.data?.message || "";

    yield put(changepasswordFail(errorMessage));
  }

}
function* profileSaga() {
  yield takeEvery(SHOW_PROFILE, fetchShows);
  yield takeEvery(CHANGE_PASSWORD, onupdatePassword);
  yield takeEvery(EDIT_PROFILE, onupdateProfile);
}

export default profileSaga;
