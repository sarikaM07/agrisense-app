import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// New: Import Toaster to display notifications from react-hot-toast
import { Toaster } from "react-hot-toast";

// Corrected imports (paths were already corrected in the user's input)
import Navbar from "./auth/components/Navbar";
import Footer from "./auth/components/Footer";
import LoginForm from "./auth/components/LoginForm";
import SignUpForm from "./auth/components/SignUpForm";

// Page Imports
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import DiseaseDetection from "./pages/DiseaseDetection";
import FieldAnalysis from "./pages/FieldAnalysis";
import Forecasting from "./pages/Forecasting";
import Profile from "./pages/Profile";

// Auth Imports
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <>
      {/* AuthProvider wraps the entire application */}
      <AuthProvider>
        <Router>
          {/* Renders the Navbar on all pages */}
          <Navbar />

          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />

              {/* Protected Routes */}
              <Route
                path="/analysis"
                element={
                  <ProtectedRoute>
                    <FieldAnalysis />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
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
                    <FieldAnalysis />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forecast"
                element={
                  <ProtectedRoute>
                    <Forecasting />
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

          {/* New: Toaster component is placed here to catch all toast notifications. */}
          <Toaster 
             position="top-right" 
             toastOptions={{
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
             }}
          />
        </Router>

        {/* Footer is rendered outside the Router, assuming it's meant for all pages too */}
        <Footer />
      </AuthProvider>
    </>
  );
}