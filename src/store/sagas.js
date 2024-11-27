import { all, fork } from "redux-saga/effects";

//public

import AuthSaga from "./auth/login/saga";
import accountSaga from "./auth/register/saga";
export default function* rootSaga() {
  yield all([
    //public
    
    fork(AuthSaga),
    fork(accountSaga)
   
  ]);
}
