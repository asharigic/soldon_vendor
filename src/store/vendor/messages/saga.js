// messagesSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_MESSAGES_LIST, SEND_MESSAGE } from './actionTypes';
import { getMessagesListSuccess, getMessagesListFail, sendMessageSuccess, sendMessageFail } from './actions';
import axiosInstance from '../../axiosInstance';

//Get Messages List
function* fetchMessagesList() {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}admin/message/message-list`);
        yield put(getMessagesListSuccess(response.data));
    } catch (error) {
        yield put(getMessagesListFail(error.message));
    }
};

//Send Message
function* sendMessage({ payload: { message } }) {
    try {
      const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}vendor/message/create`, message);
      yield put(sendMessageSuccess(response.data));
    } catch (error) {
      yield put(sendMessageFail(error.response.data.message));
    }
};

function* messagesSaga() {
    yield takeEvery(GET_MESSAGES_LIST, fetchMessagesList);
    yield takeEvery(SEND_MESSAGE, sendMessage);
};

export default messagesSaga;