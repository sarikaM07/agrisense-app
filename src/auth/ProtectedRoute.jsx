// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { user, isLoading } = useContext(AuthContext); 

//   if (isLoading) {
//     return <div className="loading-screen">Authenticating user session...</div>; 
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// src/components/ProtectedRoute.jsx

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// NOTE: Adjust the path to AuthContext based on your file structure (e.g., '../auth/AuthContext')
import { AuthContext } from "./AuthContext"; 

export default function ProtectedRoute({ children }) {
  // ✅ FIX: Using 'isAuthenticated' and 'loading' as defined in AuthContext.jsx
  const { isAuthenticated, loading } = useContext(AuthContext); 

  // 1. Wait for the authentication status to load from localStorage
  if (loading) {
    // This resolves the bug where the component redirects before the user state is read.
    return (
      <div 
        style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          fontSize: '1.2rem' 
        }}
      >
        Authenticating user session...
      </div>
    ); 
  }

  // 2. Once loading is complete, check if the user is authenticated
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // 3. If authenticated, render the children component (e.g., DiseaseDetection)
  return children;
}