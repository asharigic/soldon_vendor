import { combineReducers } from "redux";

import Layout from "./layout/reducer";
// Authentication
import Login from "./auth/login/reducer";
import account from "./auth/register/reducer";
import profileReducer from "./vendor/profile/reducer";
import settingsReducer from "./vendor/settings/reducer";
const rootReducer = combineReducers({
  Layout,
  Login:Login,
  Registration:account,
  ProfileData:profileReducer,
  SettingsData:settingsReducer
});

export default rootReducer;
