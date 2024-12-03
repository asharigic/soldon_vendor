import { call, put, takeEvery } from "redux-saga/effects";


// Ecommerce Redux States
import {
    GET_SELLINGLIST
} from "./actionType";
import {
    getSellingListSuccess,
    getSellingListFail
} from "./action";
import axiosInstance from "../../axiosInstance";

//Get buying List
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

function* SellingProductSaga() {
    yield takeEvery(GET_SELLINGLIST, fetchSellingProducts);



};

export default SellingProductSaga;