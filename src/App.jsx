import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./auth/components/Navbar";
import Footer from "./auth/components/Footer";
import LoginForm from "./auth/components/LoginForm";
import SignUpForm from "./auth/components/SignUpForm";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import DiseaseDetection from "./pages/DiseaseDetection";
import FieldAnalysis from "./pages/FieldAnalysis";
import Forecasting from "./pages/Forecasting";
import Profile from "./pages/Profile";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

function AppLayout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysis"
            element={
              <ProtectedRoute>
                <FieldAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disease"
            element={
              <ProtectedRoute>
                <DiseaseDetection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/field"
            element={
              <ProtectedRoute>
                <Forecasting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forecast"
            element={
              <ProtectedRoute>
                <FieldAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#1a3a10",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}
