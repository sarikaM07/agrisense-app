import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import DiseaseDetection from './pages/DiseaseDetection';
import FieldAnalysis from './pages/FieldAnalysis';
import Forecasting from './pages/Forecasting';
import Profile from './pages/Profile';
import LoginForm from './components/LoginForm';
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from './auth/ProtectedRoute';
import MapView from './pages/MapView';


export default function App(){
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected routes - only accessible when logged in */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><MapView/></ProtectedRoute>} />
          <Route path="/disease" element={<ProtectedRoute><DiseaseDetection/></ProtectedRoute>} />
          <Route path="/field" element={<ProtectedRoute><FieldAnalysis/></ProtectedRoute>} />
          <Route path="/forecast" element={<ProtectedRoute><Forecasting/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          


          <Route path="/map" element={<MapView />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}
