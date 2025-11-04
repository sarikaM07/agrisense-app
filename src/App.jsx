// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import DiseaseDetection from './pages/DiseaseDetection';
import FieldAnalysis from './pages/FieldAnalysis';
import Forecasting from './pages/Forecasting';
import Profile from './pages/Profile';
import LoginForm from './components/LoginForm';

// 1. 🆕 SignUpForm को इंपोर्ट करें
import SignUpForm from './components/SignUpForm'; 

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from './auth/ProtectedRoute';


export default function App() {
    return (
        <AuthProvider>
            <Router>
                {/* ✅ Navbar yahan render hoga, sabhi pages ke liye */}
                <Navbar />

                {/* Main Content Area */}
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginForm />} />

                        {/* 2. 🆕 /signup रूट जोड़ें (यह भी public route होगा) */}
                        <Route path="/signup" element={<SignUpForm />} />

                        {/* Protected routes - only accessible when logged in */}
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
                        <Route path="/disease" element={<ProtectedRoute><DiseaseDetection /></ProtectedRoute>} />
                        <Route path="/field" element={<ProtectedRoute><FieldAnalysis /></ProtectedRoute>} />
                        <Route path="/forecast" element={<ProtectedRoute><Forecasting /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                    </Routes>
                </main>

            </Router>

            {/* ✅ Footer Router के बाहर, ताकि वह हर page के bottom पर दिखे */}
            <Footer />
        </AuthProvider>
    );
}