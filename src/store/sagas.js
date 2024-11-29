import { all, fork } from "redux-saga/effects";

//public

import AuthSaga from "./auth/login/saga";
import accountSaga from "./auth/register/saga";
import profileSaga from "./vendor/profile/saga";
import settingsSaga from "./vendor/settings/saga";
import notificationsSaga from "./vendor/notifications/saga";
import messagesSaga from "./vendor/messages/saga";
import forgetPasswordSaga from "./auth/forgetpwd/saga";
export default function* rootSaga() {
  yield all([
    //public
    
    fork(AuthSaga),
    fork(accountSaga),
    fork(profileSaga),
    fork(settingsSaga),
    fork(notificationsSaga),
    fork(messagesSaga),
    fork(forgetPasswordSaga)
  ]);
}
