import { call, put, takeEvery } from "redux-saga/effects";


// Ecommerce Redux States
import {
    GET_BUYINGHLIST,
    SHOW_BUYINGHPRODUCT
} from "./actionType";
import {
    getBuyingListSuccess,
    getBuyingListFail,
    showBuyingProductSuccess,
    showBuyingProductFail
} from "./action";
import axiosInstance from "../../axiosInstance";

//Get buying List
function* fetchBuyingProducts({ payload: { seachproduct, page } }) {
    try {
        const response = yield call(
            axiosInstance.post,

            `${process.env.REACT_APP_API}vendor/cart/orders?page=${page}`,
            seachproduct
        );

        yield put(getBuyingListSuccess(response.data.orders));

    } catch (error) {
        yield put(getBuyingListFail(error.message));
    }
};
//show api for buying products
function* showBuyingProduct(id) {
    try {
        const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/cart/order/show/${id.payload.id}`);

        if (response && response.data) {
            yield put(showBuyingProductSuccess(response.data));
        } else {
            throw new Error("Invalid response format.");
        }
    } catch (error) {
        yield put(showBuyingProductFail(error.message));
    }
}
function* BuyingProductSaga() {
    yield takeEvery(GET_BUYINGHLIST, fetchBuyingProducts);
    yield takeEvery(SHOW_BUYINGHPRODUCT, showBuyingProduct);


};

export default BuyingProductSaga;