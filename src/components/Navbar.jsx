import React from 'react';
// 💥 NEW: 'Link' ko react-router-dom se import kiya gaya hai
import { Link } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
    return (
        <header className="agrisense-navbar">
            <div className="navbar-container">
                {/* Logo ko Home page se link kiya gaya */}
                <Link to="/" className="navbar-logo">AgriSense</Link>
                
                <nav className="navbar-links">
                    {/* Ab <Link to="..."> use ho raha hai */}
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/MapView" className="nav-link">Map</Link>
                    <Link to="/disease" className="nav-link">Disease</Link>
                </nav>

                <div className="navbar-actions">
                    {/* Login button ko /login route se link kiya gaya */}
                    <Link to="/login" className="nav-btn login-btn">Login</Link>
                    {/* Sign Up button ko bhi /login ya /register (agar alag ho toh) se link kar sakte hain. Filhaal /login. */}
                    <Link to="/login" className="nav-btn signup-btn">Sign Up</Link>
                </div>
            </div>
        </header>
    );
};
export default Navbar;