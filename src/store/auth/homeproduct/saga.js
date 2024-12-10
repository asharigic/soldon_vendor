import { call, put, takeEvery } from "redux-saga/effects";


// Ecommerce Redux States
import {
  GET_HOME_PRODUCTLIST,
  CLONE_PRODUCT
} from "./actionTypes";

//Include Both Helper File with needed methods
import {
  getHomeProductsListSuccess,
  getHomeProductsListFail,
  cloneProductSuccess,
  cloneProductFail
} from "./actions";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

//Get product List
function* fetchHomeProducts({ payload: { seachproduct, page } }) {
  try {
    const response = yield call(
      axiosInstance.post,

      `${process.env.REACT_APP_API}home/product-list?page=${page}`,
      seachproduct
    );

    yield put(getHomeProductsListSuccess(response.data.products_list));

  } catch (error) {
    yield put(getHomeProductsListFail(error.message));
  }
};

//Clone Product
function* CloneProduct(id) {
  try {
    const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/product/clone/${id.payload.id}`);

    if (response && response.data) {
      yield put(cloneProductSuccess(response.data));
    } else {
      yield put(cloneProductFail("Invalid response format."));
    }
  } catch (error) {
    yield put(cloneProductFail(error.message));
  }
}
function* HomeProductSaga() {
  yield takeEvery(GET_HOME_PRODUCTLIST, fetchHomeProducts);
  yield takeEvery(CLONE_PRODUCT, CloneProduct);

};

export default HomeProductSaga;