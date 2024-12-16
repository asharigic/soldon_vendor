// notificationsReducer.js
import {
    GET_UNREAD_NOTIFICATION_COUNT,
    GET_UNREAD_NOTIFICATION_COUNT_SUCCESS,
    GET_UNREAD_NOTIFICATION_COUNT_FAIL,
    GET_NOTIFICATIONS_LIST,
    GET_NOTIFICATIONS_LIST_SUCCESS,
    GET_NOTIFICATIONS_LIST_FAIL,
    GET_MARK_AS_ALL_READ_NOTIFICATION,
    GET_MARK_AS_ALL_READ_NOTIFICATION_SUCCESS,
    GET_MARK_AS_ALL_READ_NOTIFICATION_FAIL,
} from './actionTypes';

const INIT_STATE = {
    unreadnotificationcount: [],
    markasallreadnotification: [],
    notifications: [],
    notificationserror: null,
    notificationsloading: false,
    notificationssuccess: false,
    notificationsupdate: null,
    shownotification: null
};

const notificationsReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        // Get Notifications List
        case GET_UNREAD_NOTIFICATION_COUNT:
            return {
                ...state,
                loadingnotification: true
            };
        case GET_UNREAD_NOTIFICATION_COUNT_SUCCESS:
            return {
                ...state,
                unreadnotificationcount: action.payload,
                loadingnotification: false,
                successnotification: true,
            };

        case GET_UNREAD_NOTIFICATION_COUNT_FAIL:
            return {
                ...state,
                errornotification: action.payload,
                loadingnotification: false,
                successnotification: true,
            };

        case GET_NOTIFICATIONS_LIST:
            return {
                ...state,
                notificationsloading: true,
                notificationssuccess: false,
                notificationserror: null,
            };
        case GET_NOTIFICATIONS_LIST_SUCCESS:
            return {
                ...state,
                notificationsloading: false,
                notifications: action.payload,
                notificationssuccess: true,
                notificationserror: null,
            };
        case GET_NOTIFICATIONS_LIST_FAIL:
            return {
                ...state,
                notificationsloading: false,
                notificationssuccess: false,
                notificationserror: action.payload,
            };
        //Get Mark as Read Notification Count
        case GET_MARK_AS_ALL_READ_NOTIFICATION:
            return {
                ...state,
                loadingnotification: true
            };
        case GET_MARK_AS_ALL_READ_NOTIFICATION_SUCCESS:
            return {
                ...state,
                markasallreadnotification: action.payload,
                loadingnotification: false,
                successnotification: true,
            };

        case GET_MARK_AS_ALL_READ_NOTIFICATION_FAIL:
            return {
                ...state,
                errornotification: action.payload,
                loadingnotification: false,
                successnotification: true,
            };
        default:
            return state;
    }
};

export default notificationsReducer;