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
import ProductsReducer from "./vendor/products/reducer";
import termsReducer from "./master/terms/reducer";
import attributesReducer from "./master/attributes/reducer";
import TagsReducer from "./master/tags/reducer";
import CategoriesReducer from "./master/categories/reducer";
import favouriteReducer from "./vendor/favourite/reducer";
import BuyingProductsReducer from "./vendor/buyingproduct/reducer";
import SellingProductReducer from "./vendor/sellingproduct/reducer";
import HomeProductsReducer from "./auth/homeproduct/reducer";
import reportsReducer from "./vendor/reports/reducer";

const rootReducer = combineReducers({
  Layout,
  Login: Login,
  Registration: account,
  ProfileData: profileReducer,
  SettingsData: settingsReducer,
  NotificationsData: notificationsReducer,
  MessagesData: messagesReducer,
  ForgotData:forgetPasswordRedure,
  products:ProductsReducer,
  terms: termsReducer,
  attributes: attributesReducer,
  tags: TagsReducer,
  categories: CategoriesReducer,
  FavouriteData: favouriteReducer,
  BuyingProduct: BuyingProductsReducer,
  SellingProductData: SellingProductReducer,
  HomeProductData:HomeProductsReducer,
  ReportsData: reportsReducer
});

export default rootReducer;
