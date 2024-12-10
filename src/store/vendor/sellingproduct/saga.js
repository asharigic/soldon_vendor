import { call, put, takeEvery } from "redux-saga/effects";


// Ecommerce Redux States
import {
    GET_SELLINGLIST,
    GET_RETURNORDERLIST,
    SHOW_RETURNORDERLIST
} from "./actionType";
import {
    getSellingListSuccess,
    getSellingListFail,
    getretunorderListSuccess,
    getretunorderListFail,
    showretunorderListSuccess,
    showretunorderListFail
} from "./action";
import axiosInstance from "../../axiosInstance";

//Get selling List
function* fetchSellingProducts({ payload: { seachproduct, page } }) {
    try {
        const response = yield call(
            axiosInstance.post,

            `${process.env.REACT_APP_API}vendor/cart/sold?page=${page}`,
            seachproduct
        );

        yield put(getSellingListSuccess(response.data.orders));

    } catch (error) {
        yield put(getSellingListFail(error.message));
    }
};

//Get return List
function* fetchReturnOrderProducts({ payload: { seachproduct, page } }) {
    try {
        const response = yield call(
            axiosInstance.post,

            `${process.env.REACT_APP_API}vendor/cart/order-returns-list?page=${page}`,
            seachproduct
        );

        yield put(getretunorderListSuccess(response.data.return_orders));

    } catch (error) {
        yield put(getretunorderListFail(error.message));
    }
};

//show return List
function* fetchshowOrderProducts(orderid) {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/cart/order-return/show/${orderid.payload}`);

        if (response && response.data) {
            yield put(showretunorderListSuccess(response.data.return_order));
        } else {
            yield put(showretunorderListFail(response.data));
        }
    } catch (error) {
        yield put(showretunorderListFail(error.message));
    }
    // console.log(orderid.payload,
    //     "orderid"
    // )
    // try {
    //     const response = yield call(
    //         axiosInstance.get,

    //         `${process.env.REACT_APP_API}vendor/cart/order-returns-list/${orderid.payload}`, );

    //     yield put(showretunorderListSuccess(response.data.return_order));

    // } catch (error) {
    //     yield put(showretunorderListFail(error.message));
    // }
};
function* SellingProductSaga() {
    yield takeEvery(GET_SELLINGLIST, fetchSellingProducts);
    yield takeEvery(GET_RETURNORDERLIST, fetchReturnOrderProducts);
    yield takeEvery(SHOW_RETURNORDERLIST, fetchshowOrderProducts);


};

export default SellingProductSaga;