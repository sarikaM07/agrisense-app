import React from "react";

import { useNavigate } from "react-router-dom";
import "./Home.css";

import backgroundImage from "../assets/farm-field-bg.jpg";

import snakePlantImage from "../assets/snake-plant-image.jpg";

const Home = () => {

  const navigate = useNavigate();


  const handleDiseaseDetectionClick = () => {

    navigate("/disease");
  };

  // MODIFIED HANDLER TO NAVIGATE TO THE FieldAnalysis ROUTE (/analysis)
  const handleYieldForecastingClick = () => {

    navigate("/analysis"); // Navigate to the route where FieldAnalysis.jsx is rendered
  };

  // The original handleForecastingClick (navigating to /forecast) is kept for the Field Segmentation card.
  const handleSegmentationClick = () => {
    navigate("/forecast"); // Keeping original link for Field Segmentation
  };


  return (

    <div
      className="home-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

      <section className="hero-section">
        <h1 className="hero-title animate-fade-in-up">
          Smart Farming. <br /> Smarter Insights.
        </h1>
        <p className="hero-subtitle animate-fade-in-up delay-1">
          Monitor crop health, detect diseases, and forecast yield — all in one
          intelligent dashboard.
        </p>
        <div className="hero-description animate-fade-in-up delay-2">
          <p>
            AgriSense brings together the power of **AI, data visualization, and
            modern design** to help farmers make informed decisions with
            confidence. From detecting early signs of disease to forecasting
            yield and optimizing field management, every feature is built to make
            agriculture smarter, simpler, and more sustainable.
          </p>
          <ul className="agrisense-benefits">
            <li>✔️ Detect problems early</li>
            <li>✔️ Improve productivity</li>
            <li>✔️ Reduce pesticide waste</li>
            <li>✔️ Protect long-term soil health</li>
          </ul>
        </div>
      </section>

      {/* --- Why Choose Section (Stats) --- */}
      <section className="why-choose-section">
        <h2 className="why-choose-title animate-fade-in-up delay-3">
          Why Choose AgriSense ?
        </h2>
        <div className="stats-cards-container">
          <div className="stat-card animate-fade-in-up delay-4">
            <span className="stat-number">90%</span>
            <p className="stat-description">
              model accuracy in disease detection
            </p>
          </div>
          <div className="stat-card animate-fade-in-up delay-5">
            <span className="stat-number">100+</span>
            <p className="stat-description">successful farmer users</p>
          </div>
          <div className="stat-card animate-fade-in-up delay-6">
            <span className="stat-number">4.8 ⭐</span>
            <p className="stat-description">based on pilot testing feedback</p>
          </div>
        </div>
      </section>

      {/* --- Additional Content Section --- */}
      <section className="additional-content-section">
        <h3 className="section-heading animate-fade-in-up delay-7">
          Empowering Farmers with Technology
        </h3>
        <p className="section-text animate-fade-in-up delay-8">
          Our platform offers a comprehensive suite of tools designed to simplify
          complex agricultural tasks. From real-time sensor data integration to
          predictive analytics for pest outbreaks, **AgriSense is your trusted
          partner** in achieving sustainable and profitable farming operations.
        </p>
      </section>

      {/* --- Key Features Section --- */}
      <section className="key-features-container">
        <h2 className="section-heading features-title animate-fade-in-up delay-10">
          Key Features
        </h2>
        <div className="features-cards-wrapper">
          {/* Disease Detection Card */}
          <div
            className="feature-card animate-fade-in-up delay-11"
            onClick={handleDiseaseDetectionClick}
            role="button"
            tabIndex="0"
          >
            <span className="feature-icon"> 🩺 </span>
            <h3 className="card-title">Disease Detection</h3>
            <p className="card-description">
              Spot issues before they spread. AgriSense uses **AI-powered image
              analysis** to identify plant diseases instantly.
            </p>
          </div>

          {/* Field Segmentation Card (Kept linked to /forecast) */}
          <div
            className="feature-card animate-fade-in-up delay-12"
            onClick={handleSegmentationClick}
            role="button"
            tabIndex="0"
          >
            <span className="feature-icon"> ☁️ </span>
            <h3 className="card-title">Field Segmentation</h3>
            <p className="card-description">
              See your farm in data-driven color. AgriSense leverages **UNet
              segmentation models** to differentiate diseased crops, weeds, and
              soil zones from drone or satellite images.

            </p>
          </div>

          {/* Yield Forecasting Card (NOW links to /analysis for FieldAnalysis.jsx) */}
          <div
            className="feature-card animate-fade-in-up delay-13"
            onClick={handleYieldForecastingClick} // <--- UPDATED CLICK HANDLER
            role="button"
            tabIndex="0"
          >
            <span className="feature-icon"> 🚁 </span>
            <h3 className="card-title">Yield Forecasting</h3>
            <p className="card-description">
              Predict your productivity with confidence. Our **LSTM-based
              prediction model** analyzes weather patterns, soil data, and crop
              history to forecast expected yield.
            </p>
          </div>
        </div>
      </section>

      {/* --- UPDATED STORIES SECTION (Testimonials) --- */}
      <section className="stories-section">
        <h2 className="stories-title animate-fade-in-up delay-14">
          Stories Rooted in Change
        </h2>

        {/* Testimonial Card Container */}
        <div className="testimonial-card-container animate-fade-in-up delay-15">
          {/* Left Side: Text Content */}
          <div className="testimonial-content">
            {/* Rating Box */}
            <div className="rating-box">
              <span className="star-rating">⭐⭐⭐⭐</span>
              <span className="rating-number">4.2</span>
            </div>

            <p className="testimonial-text">
              AgriSense helped me detect a leaf disease before it spread across
              my field. The instant alerts and clear image reports saved my
              entire crop this season. It feels like having an expert agronomist
              in my pocket!
            </p>

            <p className="testimonial-author">
              Ramesh Patel — <br />
              <span className="author-location">Wheat Farmer, Gujarat</span>
            </p>
          </div>

          {/* Right Side: Image Placeholder */}
          <div className="testimonial-image-placeholder">
            {/* CSS will handle the image and background color here */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;