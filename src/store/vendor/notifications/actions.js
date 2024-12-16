//notificationsactions.js
import {
    GET_UNREAD_NOTIFICATION_COUNT,
    GET_UNREAD_NOTIFICATION_COUNT_SUCCESS,
    GET_UNREAD_NOTIFICATION_COUNT_FAIL,
    GET_NOTIFICATIONS_LIST,
    GET_NOTIFICATIONS_LIST_SUCCESS,
    GET_NOTIFICATIONS_LIST_FAIL,
    GET_MARK_AS_ALL_READ_NOTIFICATION,
    GET_MARK_AS_ALL_READ_NOTIFICATION_SUCCESS,
    GET_MARK_AS_ALL_READ_NOTIFICATION_FAIL
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

export const getUnreadNotificationCount = () => ({
    type: GET_UNREAD_NOTIFICATION_COUNT,
})

export const getUnreadNotificationCountSuccess = (unreadnotificationcount) => ({
    type: GET_UNREAD_NOTIFICATION_COUNT_SUCCESS,
    payload: unreadnotificationcount,
})

export const getUnreadNotificationCountFail = (error) => ({
    type: GET_UNREAD_NOTIFICATION_COUNT_FAIL,
    payload: error,
})

//Get Mark As All Read Notification Count
export const getMarkAsAllReadNotification = () => ({
    type: GET_MARK_AS_ALL_READ_NOTIFICATION,
})

export const getMarkAsAllReadNotificationSuccess = (markasreadnotificationcount) => ({
    type: GET_MARK_AS_ALL_READ_NOTIFICATION_SUCCESS,
    payload: markasreadnotificationcount,
})

export const getMarkAsAllReadNotificationFail = (error) => ({
    type: GET_MARK_AS_ALL_READ_NOTIFICATION_FAIL,
    payload: error,
})