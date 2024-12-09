import { call, put, takeEvery } from "redux-saga/effects";


// Ecommerce Redux States
import {
  GET_HOME_PRODUCTLIST
} from "./actionTypes";

//Include Both Helper File with needed methods
import {
  getHomeProductsListSuccess,
  getHomeProductsListFail
} from "./actions";
import axios from "axios";

//Get product List
function* fetchHomeProducts({ payload: { seachproduct, page } }) {
  try {
    const response = yield call(
      axios.post,

      `${process.env.REACT_APP_API}home/product-list?page=${page}`,
      seachproduct
    );

    yield put(getHomeProductsListSuccess(response.data.products));

  } catch (error) {
    yield put(getHomeProductsListFail(error.message));
  }
};


function* HomeProductSaga() {
  yield takeEvery(GET_HOME_PRODUCTLIST, fetchHomeProducts);

};

export default HomeProductSaga;