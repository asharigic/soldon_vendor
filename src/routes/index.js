import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Dashboard from "../pages/Dashboard/index";
import Profile from "../pages/Vendor/Profile/Profile";
import ChangePassword from "../pages/Vendor/Profile/ChangePassword";
import Settings from "../pages/Vendor/Settings/Settings";
import NoticationsList from "../pages/Vendor/Notifications/NoticationsList";
import Messages from "../pages/Vendor/Messages/Messages";
import ForgotPassword from "../pages/Authentication/ForgetPassword";
import PasswordverificationCode from "../pages/Authentication/PasswordverificationCode";
import ResetPassword from "../pages/Authentication/ResetPassword";

//Product
import ProductList from "../pages/Vendor/Product/ProductList";
import AddProduct from "../pages/Vendor/Product/AddProduct";
import EditProduct from "../pages/Vendor/Product/EditProduct";
import FavouriteList from "../pages/Vendor/Favourite/FavouriteList";

//Ordar Management
import BuyingListPage from "../pages/Vendor/OrdarManagement/BuyingProduct/BuyingProduct";
import SellingListPage from "../pages/Vendor/OrdarManagement/SellingProduct/SellingProduct";
import HomeProductListPage from "../pages/Authentication/HomeProduct";
import HomeProductDetails from "../pages/Authentication/HomeProductDetails";
import ReportList from "../pages/Vendor/Reports/ReportList";
import WalletList from "../pages/Vendor/Wallet/WalletList";
import ReturnOrderById from "../pages/Vendor/OrdarManagement/SellingProduct/ReturnOrderById";
import ShowBuyingProduct from "../pages/Vendor/OrdarManagement/BuyingProduct/ShowBuyingProduct";
import ViewOrderById from "../pages/Vendor/OrdarManagement/SellingProduct/ViewOrderById";
const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: '/', component: <HomeProductListPage /> },

  { path: "/profile", component: <Profile /> },
  { path: "/changepassword", component: <ChangePassword /> },
  { path: "/settings", component: <Settings /> },
  { path: "/notifications", component: <NoticationsList /> },
  { path: "/messages", component: <Messages /> },
  { path: "/productlist", component: <ProductList /> },
  { path: '/add-product', component: <AddProduct /> },
  { path: "/edit-product/:id", component: <EditProduct /> },
  { path: "/wishlist", component: <FavouriteList /> },
  { path: "/buying-list", component: <BuyingListPage /> },
  { path: "/selling-list", component: <SellingListPage /> },
  { path: "/reports", component: <ReportList /> },
  { path: "/wallet", component: <WalletList /> },
  { path: "/manage-order/:id", component: <ReturnOrderById /> },
  { path: "/buying-order/:id", component: <ShowBuyingProduct /> },
  { path: "/view-order/:id", component: <ViewOrderById /> },
  


];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: '/forgot-password', component: <ForgotPassword /> },
  { path: '/verification-code', component: <PasswordverificationCode /> },
  { path: '/reset-password', component: <ResetPassword /> },
  { path: '/', component: <HomeProductListPage /> },
  { path: '/product-details/:id', component: <HomeProductDetails /> }
  





];

export { authProtectedRoutes, publicRoutes };
