import { all, fork } from "redux-saga/effects";

//public

import AuthSaga from "./auth/login/saga";
import accountSaga from "./auth/register/saga";
import profileSaga from "./vendor/profile/saga";
import settingsSaga from "./vendor/settings/saga";
import notificationsSaga from "./vendor/notifications/saga";
import messagesSaga from "./vendor/messages/saga";
import forgetPasswordSaga from "./auth/forgetpwd/saga";
import ProductSaga from "./vendor/products/saga";
import termsSaga from "./master/terms/saga";
import attributesSaga from "./master/attributes/saga";
import TagsSaga from "./master/tags/saga";
import CategoriesSaga from "./master/categories/saga";
import favouriteSaga from "./vendor/favourite/saga";
import BuyingProductSaga from "./vendor/buyingproduct/saga";
import SellingProductSaga from "./vendor/sellingproduct/saga";
import HomeProductSaga from "./auth/homeproduct/saga";
import reportsSaga from "./vendor/reports/saga";
import walletSaga from "./vendor/wallet/saga";
import TicketListSaga from "./vendor/tickets/saga";
import DashboardSaga from "./vendor/dashboard/saga";
export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    fork(accountSaga),
    fork(profileSaga),
    fork(settingsSaga),
    fork(notificationsSaga),
    fork(messagesSaga),
    fork(forgetPasswordSaga),
    fork(ProductSaga),
    fork(termsSaga),
    fork(attributesSaga),
    fork(TagsSaga),
    fork(CategoriesSaga),
    fork(favouriteSaga),
    fork(BuyingProductSaga),
    fork(SellingProductSaga),
    fork(HomeProductSaga),
    fork(reportsSaga),
    fork(walletSaga),
    fork(TicketListSaga),
    fork(DashboardSaga)
  ]);
}
