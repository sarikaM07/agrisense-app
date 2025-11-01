// import React, { useContext } from "react";
import React from "react";
import { useContext } from "react"; 
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected page
  return children;
}


