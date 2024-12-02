import { call, put, takeEvery } from "redux-saga/effects";


// Ecommerce Redux States
import {
  GET_PRODUCTLIST,
  ADD_NEW_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  SHOW_PRODUCT,
  APPROVE_PRODUCT
} from "./actionTypes";

//Include Both Helper File with needed methods
import {
  getProductsListFail,
  getProductsListSuccess,
  addProductFail,
  addProductSuccess,
  showProductSuccess,
  showProductFail,
  editProductFail,
  editProductSuccess,
  deleteProductFail,
  deleteProductSuccess,
  approveProductSuccess,
  approveProductFail
} from "./actions";
import axiosInstance from "../../axiosInstance";

//Get product List
function* fetchProducts({ payload: { seachproduct, page } }) {
  try {
    const response = yield call(
      axiosInstance.post,

      `${process.env.REACT_APP_API}vendor/product/showall?page=${page}`,
      seachproduct
    );

    yield put(getProductsListSuccess(response.data.products));

  } catch (error) {
    yield put(getProductsListFail(error.message));
  }
};
//approve product
//Add product
function* approveProduct({ payload: { id } }) {
  try {
    const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}admin/product/approve_product/${id}`);
    yield put(approveProductSuccess(response.data));

  } catch (error) {
    yield put(approveProductFail(error.response.data.message));

  }
}


//Add product
function* addNewProduct({ payload: { product } }) {
  try {
    const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}vendor/product/create`, product);
    yield put(addProductSuccess(response.data));

  } catch (error) {
    yield put(addProductFail(error.response.data.message));

  }
}

//Show product
function* showProduct(id) {
  try {
    const response = yield call(axiosInstance.get, `${process.env.REACT_APP_API}vendor/product/show/${id.payload.id}`);
    console.log(response, "responeshow")
    if (response && response.data) {
      yield put(showProductSuccess(response.data));
    } else {
      throw new Error("Invalid response format.");
    }
  } catch (error) {
    yield put(showProductFail(error.message));
  }
}

//Edit product
function* editProduct({ payload: { id, product } }) {
  try {
    const response = yield call(axiosInstance.post, `${process.env.REACT_APP_API}vendor/product/update/${id}`, product);
    yield put(editProductSuccess(response.data));

  } catch (error) {
    yield put(editProductFail(error.response.data.message));

  }
}
//Delete product
function* deleteProduct({ payload: { product } }) {
  try {
    const response = yield call(axiosInstance.delete, `${process.env.REACT_APP_API}vendor/product/destroy/${product}`);
    yield put(deleteProductSuccess(response.data));

  } catch (error) {
    yield put(deleteProductFail(error.message));

  }
}

function* ProductSaga() {
  yield takeEvery(GET_PRODUCTLIST, fetchProducts);
  yield takeEvery(ADD_NEW_PRODUCT, addNewProduct);
  yield takeEvery(SHOW_PRODUCT, showProduct);
  yield takeEvery(EDIT_PRODUCT, editProduct);
  yield takeEvery(DELETE_PRODUCT, deleteProduct);
  yield takeEvery(APPROVE_PRODUCT, approveProduct);

};

export default ProductSaga;