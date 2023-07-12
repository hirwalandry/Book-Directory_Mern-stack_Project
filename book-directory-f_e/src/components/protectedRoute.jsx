import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import auth from "../services/authService";

function ProtectedRoute({ user, children }) {
  const location = useLocation();

  if (!user) return <Navigate replace to="/login" state={{ from: location }} />;
  return children;
}

export default ProtectedRoute;
