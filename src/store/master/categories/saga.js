import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  GET_DROP_DOWN_CATEGORY_LIST,
  ADD_NEW_CATEGORY
} from "./actionTypes";

import {
  getCategoryDropDownListSuccess,
  getCategoryDropDownListFail,
  addCategorySuccess,
  addCategoryFail,
} from "./actions";

//Get Category Drop Down
function* fetchDropDownCategories() {
  try {
    const response = yield call(axios.get, `${process.env.REACT_APP_API}public/category/categories-list`);
    yield put(getCategoryDropDownListSuccess(response.data));
  } catch (error) {
    yield put(getCategoryDropDownListFail(error.message));
  }
};

//Add Category
function* addNewCategory({ payload: { category } }) {
  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_API}public/category/create`, category);
    yield put(addCategorySuccess(response.data));
  } catch (error) {
    yield put(addCategoryFail(error.response.data.message));
  }
}
function* CategoriesSaga() {
  yield takeEvery(GET_DROP_DOWN_CATEGORY_LIST, fetchDropDownCategories);
  yield takeEvery(ADD_NEW_CATEGORY, addNewCategory);
};

export default CategoriesSaga;