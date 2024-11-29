// messagesReducer.js
import {
    GET_MESSAGES_LIST,
    GET_MESSAGES_LIST_SUCCESS,
    GET_MESSAGES_LIST_FAIL
} from './actionTypes';

const INIT_STATE = {
    messages: [],
    messageserror: null,
    messagesloading: false,
    messagessuccess: false,
    messagesupdate: null
};

const messagesReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        // Get Messages List
        case GET_MESSAGES_LIST:
            return {
                ...state,
                messagesloading: true,
                messagessuccess: false,
                messageserror: null,
            };
        case GET_MESSAGES_LIST_SUCCESS:
            return {
                ...state,
                messagesloading: false,
                messages: action.payload,
                messagessuccess: true,
                messageserror: null,
            };
        case GET_MESSAGES_LIST_FAIL:
            return {
                ...state,
                messagesloading: false,
                messagessuccess: false,
                messageserror: action.payload,
            };

        default:
            return state;
    }
};

export default messagesReducer;