// notificationsReducer.js
import {
    GET_NOTIFICATIONS_LIST,
    GET_NOTIFICATIONS_LIST_SUCCESS,
    GET_NOTIFICATIONS_LIST_FAIL
} from './actionTypes';

const INIT_STATE = {
    notifications: [],
    notificationserror: null,
    notificationsloading: false,
    notificationssuccess: false,
    notificationsupdate: null
};

const notificationsReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        // Get Notifications List
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

        default:
            return state;
    }
};

export default notificationsReducer;