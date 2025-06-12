import React from "react";
import { Navigate } from "react-router-dom";
import { canAccess } from "../permissions";

const ProtectedRoute = ({ isAuthenticated, resource, userRole, children }) => {
  if (isAuthenticated && !canAccess(userRole, resource)) {
    return <Navigate to="/not-authorized" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
