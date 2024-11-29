import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// Ecommerce Redux States
import {
  GET_TAGS_DROP_DOWN_LIST,
  ADD_NEW_TAG
} from "./actionTypes";

//Include Both Helper File with needed methods
import {
  getTagDropDownListSuccess,
  getTagDropDownListFail,
  addTagSuccess,
  addTagFail,
} from "./actions";


//Get Tags Drop Down
function* fetchDropDownTags() {
  try {
    const response = yield call(axios.get, `${process.env.REACT_APP_API}public/tag/tags-list`);
    yield put(getTagDropDownListSuccess(response.data));
  } catch (error) {
    yield put(getTagDropDownListFail(error.message));
  }
};

//Add Tag
function* addNewTag({ payload: { tag } }) {
  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_API}public/tag/create`, tag);
    yield put(addTagSuccess(response.data));
  } catch (error) {
    yield put(addTagFail(error.response.data.message));
  }
}
function* TagsSaga() {
  
  yield takeEvery(GET_TAGS_DROP_DOWN_LIST, fetchDropDownTags);
  yield takeEvery(ADD_NEW_TAG, addNewTag);
};

export default TagsSaga;