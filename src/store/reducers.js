import { combineReducers } from "redux";

import Layout from "./layout/reducer";
// Authentication
import Login from "./auth/login/reducer";
import account from "./auth/register/reducer";
import profileReducer from "./vendor/profile/reducer";
import settingsReducer from "./vendor/settings/reducer";
import notificationsReducer from "./vendor/notifications/reducer";
import messagesReducer from "./vendor/messages/reducer";
import forgetPasswordRedure from "./auth/forgetpwd/reducer";

const rootReducer = combineReducers({
  Layout,
  Login: Login,
  Registration: account,
  ProfileData: profileReducer,
  SettingsData: settingsReducer,
  NotificationsData: notificationsReducer,
  MessagesData: messagesReducer,
  ForgotData:forgetPasswordRedure
});

export default rootReducer;
