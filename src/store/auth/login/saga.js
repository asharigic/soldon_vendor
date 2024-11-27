import { call, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import axios from "axios";
function* loginUser({ payload: { user, navigate } }) {

  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_API}session/login`, user);
    
    yield put(loginSuccess(response.data));
  
    localStorage.setItem('authUsertoken', JSON.stringify(response.data.token));
    localStorage.setItem('authUser', JSON.stringify(response.data));
    navigate('/dashboard');
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "";
 
    yield put(apiError(errorMessage));
  }
  
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUsertoken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("profileImage");
    history('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}



function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
