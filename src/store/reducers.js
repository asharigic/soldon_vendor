import { combineReducers } from "redux";

import Layout from "./layout/reducer";
// Authentication
import Login from "./auth/login/reducer";
import account from "./auth/register/reducer";
const rootReducer = combineReducers({
  Layout,
  Login:Login,
  Registration:account,
});

export default rootReducer;
