import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = () => {
    const currentUser = localStorage.getItem("token");

    return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;