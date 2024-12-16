// notificationsSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import {
    GET_NOTIFICATIONS_LIST,
    GET_MARK_AS_ALL_READ_NOTIFICATION,
    GET_UNREAD_NOTIFICATION_COUNT
} from './actionTypes';
import {
    getUnreadNotificationCountSuccess,
    getUnreadNotificationCountFail,
    getNotificationsListSuccess,
     getNotificationsListFail,
    getMarkAsAllReadNotificationSuccess,
    getMarkAsAllReadNotificationFail,
} from './actions';
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
//Get Unread Notification Count
function* fetchUnreadNotificationCount() {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/notification/unread-notification-count`);
        yield put(getUnreadNotificationCountSuccess(response.data));
    } catch (error) {
        yield put(getUnreadNotificationCountFail(error.message));
    }
};

//Get Mark As Read Notification Count
function* fetchMarkAsAllReadNotificationCount() {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/notification/mark-all-read`);
        yield put(getMarkAsAllReadNotificationSuccess(response.data));
    } catch (error) {
        yield put(getMarkAsAllReadNotificationFail(error.message));
    }
};

function* notificationsSaga() {
    yield takeEvery(GET_UNREAD_NOTIFICATION_COUNT, fetchUnreadNotificationCount);
    yield takeEvery(GET_NOTIFICATIONS_LIST, fetchNotificationsList);
    yield takeEvery(GET_MARK_AS_ALL_READ_NOTIFICATION, fetchMarkAsAllReadNotificationCount);
};

export default notificationsSaga;