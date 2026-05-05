import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import backgroundImage from "../assets/farm-field-bg.jpg";
import snakePlantImage from "../assets/snake-plant-image.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in-up">
            Smart Farming.<br />Smarter Insights.
          </h1>
          <p className="hero-subtitle animate-fade-in-up delay-2">
            Monitor crop health, detect diseases, and forecast yield — all in one intelligent dashboard.
          </p>
          <div className="hero-description animate-fade-in-up delay-3">
            <p>
              AgriSense brings together the power of{' '}
              <span className="highlight-text">AI, data visualization, and modern design</span>{' '}
              to help farmers make informed decisions with confidence. From detecting early signs of
              disease to forecasting yield and optimizing field management, every feature is built
              to make agriculture smarter, simpler, and more sustainable.
            </p>
          </div>
          <ul className="agrisense-benefits animate-fade-in-up delay-4">
            <li>
              <span className="benefit-check">✓</span>
              Detect problems early
            </li>
            <li>
              <span className="benefit-check">✓</span>
              Improve productivity
            </li>
            <li>
              <span className="benefit-check">✓</span>
              Reduce pesticide waste
            </li>
            <li>
              <span className="benefit-check">✓</span>
              Protect long-term soil health
            </li>
          </ul>
        </div>
      </section>

      {/* ===== WHY CHOOSE SECTION ===== */}
      <section className="why-choose-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h2 className="why-choose-title animate-fade-in-up">Why Choose AgriSense ?</h2>
        <div className="stats-cards-container">
          <div className="stat-card animate-fade-in-up delay-2">
            <span className="stat-number">90%</span>
            <p className="stat-description">model accuracy in disease detection</p>
          </div>
          <div className="stat-card animate-fade-in-up delay-3">
            <span className="stat-number">100</span>
            <p className="stat-description">successful farmer users</p>
          </div>
          <div className="stat-card animate-fade-in-up delay-4">
            <span className="stat-number">4.8 ⭐</span>
            <p className="stat-description">Average User Rating, based on pilot testing feedback</p>
          </div>
        </div>
      </section>

      {/* ===== KEY FEATURES SECTION ===== */}
      <section className="key-features-section" id="features">
        <h2 className="features-title animate-fade-in-up">Key Features</h2>
        <div className="features-cards-wrapper">
          {/* Disease Detection */}
          <div
            className="feature-card animate-fade-in-up delay-2"
            onClick={() => navigate('/disease')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate('/disease')}
          >
            <span className="feature-icon">🩺</span>
            <h3 className="card-title">Disease Detection</h3>
            <p className="card-subtitle">Spot issues before they spread.</p>
            <p className="card-description">
              AgriSense uses AI-powered image analysis to identify plant diseases instantly.
            </p>
          </div>

          {/* Field Segmentation */}
          <div
            className="feature-card animate-fade-in-up delay-3"
            onClick={() => navigate('/field')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate('/field')}
          >
            <span className="feature-icon">🚁</span>
            <h3 className="card-title">Field Segmentation</h3>
            <p className="card-subtitle">See your farm in data-driven color.</p>
            <p className="card-description">
              AgriSense leverages U-Net segmentation models to differentiate between crops, weeds,
              and soil zones from drone or satellite images.
            </p>
          </div>

          {/* Yield Forecasting */}
          <div
            className="feature-card featured animate-fade-in-up delay-4"
            onClick={() => navigate('/forecast')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate('/forecast')}
          >
            <span className="feature-icon">☁️</span>
            <h3 className="card-title">Yield Forecasting</h3>
            <p className="card-subtitle">Predict your productivity with confidence.</p>
            <p className="card-description">
              Our LSTM-based prediction model analyzes weather patterns, soil data, and crop history
              to forecast expected yield.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="stories-section" id="testimonials">
        <h2 className="stories-title animate-fade-in-up">Stories Rooted in Change</h2>
        <div className="testimonial-card-container animate-fade-in-up delay-2">
          <div className="testimonial-content">
            <div className="rating-box">
              <span className="star-rating">⭐⭐⭐⭐</span>
              <span className="rating-number">4.2</span>
            </div>
            <p className="testimonial-text">
              "AgriSense helped me detect a leaf disease before it spread across my field.
              The instant alerts and clear image reports saved my entire crop this season.
              It feels like having an expert agronomist in my pocket!"
            </p>
            <p className="testimonial-author">
              Ramesh Patel —
              <span className="author-location">Wheat Farmer, Gujarat</span>
            </p>
          </div>
          <div
            className="testimonial-image-placeholder"
            style={{ backgroundImage: `url(${snakePlantImage})` }}
          />
        </div>
      </section>

    </div>
  );
};

export default Home;