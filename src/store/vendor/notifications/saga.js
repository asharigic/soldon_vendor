// notificationsSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_NOTIFICATIONS_LIST } from './actionTypes';
import { getNotificationsListSuccess, getNotificationsListFail } from './actions';
import axiosInstance from '../../axiosInstance';

//Get Notifications List
function* fetchNotificationsList() {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/notification/notification-list`);
        yield put(getNotificationsListSuccess(response.data));
    } catch (error) {
        yield put(getNotificationsListFail(error.message));
    }
};

function* notificationsSaga() {
    yield takeEvery(GET_NOTIFICATIONS_LIST, fetchNotificationsList);
};

export default notificationsSaga;