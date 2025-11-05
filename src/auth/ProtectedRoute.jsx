import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useContext(AuthContext); 

  if (isLoading) {
    return <div className="loading-screen">Authenticating user session...</div>; 
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}