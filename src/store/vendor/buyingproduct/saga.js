import { call, put, takeEvery } from "redux-saga/effects";


// Ecommerce Redux States
import {
    GET_BUYINGHLIST,
} from "./actionType";
import {
    getBuyingListSuccess,
    getBuyingListFail
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

function* BuyingProductSaga() {
    yield takeEvery(GET_BUYINGHLIST, fetchBuyingProducts);
    
  
  };
  
  export default BuyingProductSaga;