import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Styling ke liye LoginForm.css ko use kiya ja raha hai (glassmorphism look)
// Isse component looks mein consistency aayegi.
import './LoginForm.css'; 

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '', // ✅ Name field
        email: '', // ✅ Email field
        password: '', // ✅ Password field
        confirmPassword: '', // ✅ Confirm Password field
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation check
        if (formData.password !== formData.confirmPassword) {
            console.error("Passwords do not match!");
            // Yahan par user ko error message dikhane ka logic add karein (e.g., alert ya state update)
            return;
        }

        // 🚨 Yahan pe Firebase Sign Up logic aayega (e.g., createUserWithEmailAndPassword)
        console.log('Sign Up Data:', formData);

        // Success hone par user ko dashboard ya login page par redirect kar sakte hain.
        // Example: navigate('/dashboard');
    };

    return (
        <div className="auth-page-container"> {/* Yeh class background image/overlay ke liye hai */}
            <div className="login-card"> {/* Yeh class aapke provided image ke glassmorphism card ko style karti hai */}
                <h2 className="login-title">Create Account</h2>
                
                <form onSubmit={handleSubmit} className="login-form">
                    
                    {/* Full Name field */}
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                    />

                    {/* Email field */}
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@agrisense.com"
                        required
                    />

                    {/* Password field */}
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {/* Confirm Password field */}
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="signin-button">
                        Sign Up
                    </button>
                </form>

                <p className="auth-footer-text">
                    Already have an account? <Link to="/login" className="footer-link">Log In</Link>
                </p>
                
            </div>
        </div>
    );
};

export default SignUpForm;
