//messagesactions.js
import {
    GET_MESSAGES_LIST,
    GET_MESSAGES_LIST_SUCCESS,
    GET_MESSAGES_LIST_FAIL,
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
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

//Send Message
export const sendMessage = (message, navigate) => {
    return {
      type: SEND_MESSAGE,
      payload: { message, navigate },
    }
  }
  
  export const sendMessageSuccess = (message) => {
    return {
      type: SEND_MESSAGE_SUCCESS,
      payload: message,
    }
  }
  
  export const sendMessageFail = (error) => {
    return {
      type: SEND_MESSAGE_FAIL,
      payload: error,
    }
  }