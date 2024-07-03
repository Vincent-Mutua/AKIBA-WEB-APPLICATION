// src/components/PrivateRoute.tsx
import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ adminOnly, ...rest }) => {
  const { currentUser, isAdmin } = useAuth(); // Implement useAuth hook based on your authentication logic
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/", { replace: true }); // Redirect to login page if not authenticated
    return null;
  }

  if (adminOnly && !isAdmin) {
    navigate("/user/dashboard", { replace: true }); // Redirect non-admin users away from admin dashboard
    return null;
  }

  return <Route {...rest} />;
};

export default PrivateRoute;
