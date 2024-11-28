import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Dashboard from "../pages/Dashboard/index";
import Profile from "../pages/Vendor/Profile/Profile";
const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/", exact: true, component: <Navigate to="/Dashboard" /> },
  { path: "/profile", component: <Profile /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  
];

export { authProtectedRoutes, publicRoutes };
