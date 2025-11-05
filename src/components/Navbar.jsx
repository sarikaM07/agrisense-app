// src/components/Navbar.jsx

// src/components/Navbar.jsx

import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const hideAuthButtons = location.pathname === '/login' || location.pathname === '/signup';
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
                    {!user && !hideAuthButtons ? (
                        <>
                            <Link to="/login" className="nav-btn login-btn">Login</Link>
                            <Link to="/signup" className="nav-btn signup-btn">Sign Up</Link>
                        </>
                    ) : user && !hideAuthButtons ? (
                        <>
                            <span className="navbar-user">{user?.name || user?.email}</span>
                            <button className="nav-btn logout-btn" onClick={logout}>Logout</button>
                        </>
                    ) : null}
                </div>
            </div>
        </header>
    );
};
export default Navbar;