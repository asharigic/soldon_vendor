

// Login Redux States
import { FORGET_PASSWORD,VERIFY_FORGOT_CODE,RESET_FORGOT_CODE } from "./actionTypes"
import { userForgetPasswordSuccess,userForgetPasswordError,verifyforgotcodePasswordSuccess,verifyforgotcodePasswordError,resetforgotcodePasswordSuccess,resetforgotcodePasswordError } from "./actions"
import axios from "axios";
import { call, put, takeEvery } from 'redux-saga/effects';


//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user } }) {
  try {

    // const response = yield call(postFakeForgetPwd, "/fake-forget-pwd", {
    //   email: user.email,
    // })
    const response = yield call(axios.post, `${process.env.REACT_APP_API}password/email`, user);
  
    yield put(userForgetPasswordSuccess(response.data));


  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred while fetching terms.";

    // Dispatch failure action
    yield put(userForgetPasswordError(errorMessage));

  }
}
//verify code
function* verifyCode({ payload: { verifyforgotcode } }) {
  try {

    const response = yield call(axios.post, `${process.env.REACT_APP_API}password/otp/verify`, verifyforgotcode);
    if (response.data.status === false) {

      yield put(verifyforgotcodePasswordError(response.data.message));
    }
    else {
      yield put(verifyforgotcodePasswordSuccess(response.data));
    }


  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred while fetching terms.";

    // Dispatch failure action
    yield put(verifyforgotcodePasswordError(errorMessage));

  }
}

function* resetCode({ payload: { resetforgotcode } }) {
  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_API}password/reset`, resetforgotcode);
    yield put(resetforgotcodePasswordSuccess(response.data));

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred while fetching terms.";

    // Dispatch failure action
    yield put(resetforgotcodePasswordError(errorMessage));

  }
}

function* forgetPasswordSaga() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
  yield takeEvery(VERIFY_FORGOT_CODE, verifyCode);
  yield takeEvery(RESET_FORGOT_CODE, resetCode);


}

export default forgetPasswordSaga
