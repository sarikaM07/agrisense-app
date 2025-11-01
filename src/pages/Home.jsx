import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import './Home.css';

export default function Home() {
  const navigate = useNavigate(); // ✅ Add navigation hook

  return (
    <div className="home-container">
      {/* 🌾 HERO SECTION */}
      <section
        className="hero-section"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=60)',
        }}
      >
        <div className="hero-content">
          <h2 className="hero-title">Smart Farming. Smarter Insights.</h2>
          <p className="hero-description">
            Monitor crop health, detect disease, and forecast yield — all in one intelligent dashboard.
          </p>

          <div className="stats-grid">
            <StatsCard title="Accuracy" value="90%" caption="Model accuracy" />
            <StatsCard title="Farms" value="120+" caption="Farms analyzed" />
            <StatsCard title="Rating" value="4.8 ⭐" caption="User satisfaction" />
          </div>
        </div>
      </section>

      {/* 🌱 FEATURES SECTION */}
      <section className="features-section">
        <h3 className="features-title">Key Features</h3>
        <div className="features-grid">

          {/* ✅ Feature 1: Disease Detection */}
          <div className="feature-card" onClick={() => navigate('/disease')} style={{ cursor: 'pointer' }}>
            <h4>Disease Detection</h4>
            <p>AI-based plant disease recognition from leaf images.</p>
          </div>

          {/* ✅ Feature 2: Field Segmentation */}
          <div
            className="feature-card clickable"
            onClick={() => navigate('/field-analysis')} // ✅ Link to your FieldAnalysis page
            style={{ cursor: 'pointer' }}
          >
            <h4>Field Analysis</h4>
            <p>View your farm map with detailed crop zones.</p>
          </div>

          {/* ✅ Feature 3: Yield Forecasting */}
          <div className="feature-card">
            <h4>Forecasting</h4>
            <p>Predict productivity using historical and live data.</p>
          </div>

          {/* ✅ Feature 4: Smart Dashboards */}
          <div className="feature-card">
            <h4>Smart Dashboards</h4>
            <p>Monitor crop, soil, and weather insights in one place.</p>
          </div>
        </div>
      </section>

      {/* 🌾 FOOTER SECTION */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>AgriSense</h2>
            <p>Empowering farmers with AI-driven insights 🌾</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: agrisense@gmail.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 AgriSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
