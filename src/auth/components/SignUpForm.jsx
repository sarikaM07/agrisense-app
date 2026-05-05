import React, { useState } from 'react';
import './SignUpForm.css';
import farmBg from '../../assets/farm-field-bg.jpg';

const EyeIcon = ({ open }) => open ? (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPwd, setShowPwd]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage]         = useState('');
  const [isSuccess, setIsSuccess]     = useState(false);
  const [isLoading, setIsLoading]     = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('https://agrisense-gno8.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('✅ Registration successful! Redirecting to login…');
        setIsSuccess(true);
        setTimeout(() => { window.location.href = '/login'; }, 2500);
      } else {
        setMessage(`❌ ${data.message || 'Registration failed'}`);
        setIsSuccess(false);
        setIsLoading(false);
      }
    } catch (error) {
      setMessage('❌ Network error. Please check your connection.');
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('❌ Passwords do not match!');
      setIsSuccess(false);
      return;
    }
    handleRegistration();
  };

  return (
    <div className="signup-page">
      {/* Background layers */}
      <div className="signup-bg" style={{ backgroundImage: `url(${farmBg})` }} />
      <div className="signup-overlay" />

      {/* Left Panel */}
      <div className="signup-left">
        <h1 className="signup-heading">Let's Get<br />Started</h1>
        <p className="signup-tagline">
          Create your AgriSense account to unlock smarter farming insights
          and real-time crop analytics.
        </p>
      </div>

      {/* Right Panel */}
      <div className="signup-right">
        <div className="signup-card">
          <h2 className="signup-title">Sign up</h2>

          {message && (
            <div className={`signup-message ${isSuccess ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="signup-field">
              <label className="signup-label" htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                type="text"
                name="name"
                className="signup-input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="signup-field">
              <label className="signup-label" htmlFor="signup-email">E-Mail</label>
              <input
                id="signup-email"
                type="email"
                name="email"
                className="signup-input"
                placeholder="Enter your e-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="signup-field">
              <label className="signup-label" htmlFor="signup-password">Password</label>
              <div className="password-field-wrapper">
                <input
                  id="signup-password"
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  className="signup-input"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowPwd(v => !v)}>
                  <EyeIcon open={showPwd} />
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="signup-field">
              <label className="signup-label" htmlFor="signup-confirm">Confirm Password</label>
              <div className="password-field-wrapper">
                <input
                  id="signup-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  className="signup-input"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowConfirm(v => !v)}>
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="signup-submit"
              disabled={isLoading || isSuccess}
            >
              {isLoading ? <><span className="btn-spinner" /> Registering…</> : 'Create Account'}
            </button>
          </form>

          <p className="signup-login">
            Already a member? <a href="/login">Sign in here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
