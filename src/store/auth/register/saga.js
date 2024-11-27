import { takeEvery, put, call } from "redux-saga/effects"
import axios from "axios"
//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"


function* registerUser({ payload: { user } }) {

  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_API}registration/vendor/create`, user);

    yield put(registerUserSuccessful(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.errors.email || "";

    yield put(registerUserFailed(errorMessage));
  }


}


function* accountSaga() {
  yield takeEvery(REGISTER_USER, registerUser);

}

export default accountSaga
