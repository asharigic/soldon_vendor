// messagesSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_MESSAGES_LIST } from './actionTypes';
import { getMessagesListSuccess, getMessagesListFail } from './actions';
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

function* messagesSaga() {
    yield takeEvery(GET_MESSAGES_LIST, fetchMessagesList);
};

export default messagesSaga;