//notificationsactions.js
import {
    GET_NOTIFICATIONS_LIST,
    GET_NOTIFICATIONS_LIST_SUCCESS,
    GET_NOTIFICATIONS_LIST_FAIL
} from "./actionTypes";

// Get Notifications List
export const getNotificationsList = () => ({
    type: GET_NOTIFICATIONS_LIST,
});

export const getNotificationsListSuccess = (notifications) => ({
    type: GET_NOTIFICATIONS_LIST_SUCCESS,
    payload: notifications,
});

export const getNotificationsListFail = (error) => ({
    type: GET_NOTIFICATIONS_LIST_FAIL,
    payload: error,
});