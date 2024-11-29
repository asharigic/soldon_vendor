import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Dashboard from "../pages/Dashboard/index";
import Profile from "../pages/Vendor/Profile/Profile";
import Settings from "../pages/Vendor/Settings/Settings";
import NoticationsList from "../pages/Vendor/Notifications/NoticationsList";
import Messages from "../pages/Vendor/Messages/Messages";
import ForgotPassword from "../pages/Authentication/ForgetPassword";
import PasswordverificationCode from "../pages/Authentication/PasswordverificationCode";
import ResetPassword from "../pages/Authentication/ResetPassword";

//Product
import ProductList from "../pages/Vendor/Product/ProductList";
const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/", exact: true, component: <Navigate to="/Dashboard" /> },
  { path: "/profile", component: <Profile /> },
  { path: "/settings", component: <Settings /> },
  { path: "/notifications", component: <NoticationsList /> },
  { path: "/messages", component: <Messages /> },
  { path: "/productlist", component: <ProductList /> },
  
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  {path:'/forgot-password',component:<ForgotPassword/>},
  {path:'/verification-code',component:<PasswordverificationCode/>},
  {path:'/reset-password',component:<ResetPassword/>}
  

  
  
  
];

export { authProtectedRoutes, publicRoutes };
