import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

const authProtectedRoutes = [
  
  { path: "/", exact: true, component: <Navigate to="/login" /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  
];

export { authProtectedRoutes, publicRoutes };
