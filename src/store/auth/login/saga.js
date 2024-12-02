import { call, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, VERIFY_CODE ,LOGOUT_USER,RESET_CODE} from "./actionTypes";
import { apiError, loginSuccess,verifycodePasswordSuccess ,verifycodePasswordError,resetcodePasswordSuccess, resetcodePasswordError ,loginError} from "./actions";
import axios from "axios";
function* loginUser({ payload: { user } }) {

  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_API}vendor/session/login`, user);
   
    yield put(loginSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "";

    yield put(loginError(errorMessage));
  }

}

//verify code
function* verifyCode({ payload: { verifycode } }) {
  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_API}session/verify/otp`, verifycode);
    if (response.data.status === false) {
    
      yield put(verifycodePasswordError(response.data.message));
    }
    else {
      yield put(verifycodePasswordSuccess(response.data));
    }


  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred while fetching terms.";

    // Dispatch failure action
    yield put(verifycodePasswordError(errorMessage));

  }
}

function* resetCode({ payload: { resetcode } }) {
  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_API}session/resend/otp`, resetcode);
    yield put(resetcodePasswordSuccess(response.data));

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred while fetching terms.";

    // Dispatch failure action
    yield put(resetcodePasswordError(errorMessage));

  }
}

function* logoutUser({ payload: { navigate } }) {
  try {
    localStorage.removeItem("vendorusertoken");
    localStorage.removeItem("vendoruser");
    navigate('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}



function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(VERIFY_CODE, verifyCode);
  yield takeEvery(RESET_CODE, resetCode);
}

export default authSaga;
