import React from "react";
import { Route, Navigate, } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();



const ProtectedRoute = ({ children }) => {
    const token = cookies.get("TOKEN");
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

export default ProtectedRoute;