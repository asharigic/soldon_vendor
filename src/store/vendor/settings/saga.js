// settingsSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { EDIT_SETTINGS, GET_SETTINGS } from './actionTypes';
import { getSettingsSuccess, getSettingsFail, editSettingsSuccess, editSettingsFail } from './actions';
import axiosInstance from '../../axiosInstance';

//Get Settings
function* fetchSettings() {
  try {
    const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/vendor-setting/show`);
    yield put(getSettingsSuccess(response.data));
  } catch (error) {
    yield put(getSettingsFail(error.message));
  }
};

//Edit Settings
function* editSettings({ payload: settings }) {
  try {
    const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}vendor/vendor-setting/update`, settings);
    yield put(editSettingsSuccess(response.data));
  } catch (error) {
    yield put(editSettingsFail(error.response.data.message));
  }
}

function* settingsSaga() {
  yield takeEvery(GET_SETTINGS, fetchSettings);
  yield takeEvery(EDIT_SETTINGS, editSettings);
};

export default settingsSaga;