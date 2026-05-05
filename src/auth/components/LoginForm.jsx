import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./LoginForm.css";
import { toast } from "react-hot-toast";
import farmBg from "../../assets/farm-field-bg.jpg";

export default function LoginForm() {
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [remember, setRemember]     = useState(false);
  const [showPassword, setShowPwd]  = useState(false);
  const [loading, setLoading]       = useState(false);

  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://agrisense-gno8.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (res.status !== 200) {
        const errorData = await res.json();
        toast.error("Login failed. Please check your credentials.");
        throw new Error(errorData.message || "Login failed");
      } else {
        const responseData = await res.json();
        const accessToken  = responseData.data.accessToken;
        const userData     = responseData.data.user;
        login(accessToken, userData);
        toast.success("Login successful!");
        nav("/dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const EyeIcon = ({ open }) => open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  return (
    <div className="login-page">
      {/* Farm background */}
      <div className="login-bg" style={{ backgroundImage: `url(${farmBg})` }} />
      <div className="login-overlay" />

      {/* Centered glass card */}
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please enter your details</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="login-field">
            <label className="login-label" htmlFor="login-email">E-Mail</label>
            <input
              id="login-email"
              type="email"
              className="login-input"
              placeholder="Enter your e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with toggle */}
          <div className="login-field">
            <label className="login-label" htmlFor="login-password">Password</label>
            <div className="password-field-wrapper">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPwd(v => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="login-options">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="login-forgot">Forgot Password?</a>
          </div>

          {/* Submit */}
          <button type="submit" className="login-submit" disabled={loading}>
            {loading && <span className="btn-spinner" />}
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="login-register">
          Don't have an account?{" "}
          <a href="/signup">Sign up free</a>
        </p>
      </div>
    </div>
  );
}
