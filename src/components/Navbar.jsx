// src/components/Navbar.jsx

import React from 'react';

import { Link } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
    return (
        <header className="agrisense-navbar">
            <div className="navbar-container">
                
                <Link to="/" className="navbar-logo">AgriSense</Link>
                
                <nav className="navbar-links">
                
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/MapView" className="nav-link">Map</Link>
                    <Link to="/disease" className="nav-link">Disease</Link>
                </nav>

                <div className="navbar-actions">
                    
                    {/* Login Link: Correctly points to /login */}
                    <Link to="/login" className="nav-btn login-btn">Login</Link>
                    
                    {/* 🚀 Sign Up Link: Changed 'to' prop from /login to /signup */}
                    <Link to="/signup" className="nav-btn signup-btn">Sign Up</Link> 
                </div>
            </div>
        </header>
    );
};
export default Navbar;