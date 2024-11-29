//messagesactions.js
import {
    GET_MESSAGES_LIST,
    GET_MESSAGES_LIST_SUCCESS,
    GET_MESSAGES_LIST_FAIL
} from "./actionTypes";

// Get Messages List
export const getMessagesList = () => ({
    type: GET_MESSAGES_LIST,
});

export const getMessagesListSuccess = (messages) => ({
    type: GET_MESSAGES_LIST_SUCCESS,
    payload: messages,
});

export const getMessagesListFail = (error) => ({
    type: GET_MESSAGES_LIST_FAIL,
    payload: error,
});