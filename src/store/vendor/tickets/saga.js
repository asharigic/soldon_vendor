import { call, put, takeEvery } from "redux-saga/effects";


// Ecommerce Redux States
import {
   GET_TICKET_LIST,
   CREATE_TICKET,
   SHOW_TICKET_LIST
} from "./actionType";
import {
   getticketslistSuccess,
   getticketslistFail,
   createticketlistSuccess,
   createticketlistFail,
   showticketListSuccess,
   showticketListFail
} from "./action";
import axiosInstance from "../../axiosInstance";

//Get ticket List
function* fetchTicketslists({ payload: { seachproduct, page } }) {
    try {
        const response = yield call(
            axiosInstance.post,

            `${process.env.REACT_APP_API}vendor/ticket/showall?page=${page}`,
            seachproduct
        );

        yield put(getticketslistSuccess(response.data.tickets));

    } catch (error) {
        yield put(getticketslistFail(error.message));
    }
};
//create ticket
function* createticketlistdata({ payload: ticketsdata }) {
    try {
        const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}vendor/ticket/create`, ticketsdata);
        yield put(createticketlistSuccess(response.data));
    } catch (error) {
        yield put(createticketlistFail(error.response.data.message));
    }
}

//show return List
function* fetchshowtickets(ticketid) {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/ticket/show/${ticketid.payload}`);

        if (response && response.data) {
            yield put(showticketListSuccess(response.data));
        } else {
            yield put(showticketListFail(response.data));
        }
    } catch (error) {
        yield put(showticketListFail(error.message));
    }
};
function* TicketListSaga() {
    yield takeEvery(GET_TICKET_LIST, fetchTicketslists);
    yield takeEvery(CREATE_TICKET, createticketlistdata);
    yield takeEvery(SHOW_TICKET_LIST, fetchshowtickets);
    
};

export default TicketListSaga;