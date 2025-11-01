// src/pages/Home.jsx (Marquee section hata diya gaya hai)

import React from "react";
import "./Home.css";

import backgroundImage from "../assets/farm-field-bg.jpg";

const Home = () => {
  return (
    // Main Parent Div: .home-container
    <div
      className="home-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* --- Hero Section --- */}     {" "}
      <section className="hero-section">
        {/* ... Hero Content ... */}
        <h1 className="hero-title animate-fade-in-up">
          Smart Farming. <br />          Smarter Insights.        {" "}
        </h1>
        {" "}
        <p className="hero-subtitle animate-fade-in-up delay-1">
          Monitor crop health, detect diseases, and forecast yield —
          all in one intelligent dashboard.        {" "}
        </p>
        {" "}
        <div className="hero-description animate-fade-in-up delay-2">
          {" "}
          <p>
            AgriSense brings together the power of AI, data
            visualization, and modern design to             help farmers make
            informed decisions with confidence. From detecting early signs of
            disease to             forecasting yield and optimizing field
            management, every feature is built to make             agriculture
            smarter, simpler, and more sustainable.          {" "}
          </p>
          {" "}
          <ul className="agrisense-benefits">
            <li>✔️ Detect problems early</li>           {" "}
            <li>✔️ Improve productivity</li>           {" "}
            <li>✔️ Reduce pesticide waste</li>           {" "}
            <li>✔️ Protect long-term soil health</li>         {" "}
          </ul>
          {" "}
        </div>
        {" "}
      </section>
      {/* --- Why Choose AgriSense Section (Stats Cards) --- */}     {" "}
      <section className="why-choose-section">
        {" "}
        <h2 className="why-choose-title animate-fade-in-up delay-3">
          Why Choose AgriSense ?        {" "}
        </h2>
        {" "}
        <div className="stats-cards-container">
          {" "}
          <div className="stat-card animate-fade-in-up delay-4">
            <span className="stat-number">90%</span>           {" "}
            <p className="stat-description">
              model accuracy in disease detection
            </p>
            {" "}
          </div>
          {" "}
          <div className="stat-card animate-fade-in-up delay-5">
            <span className="stat-number">100+</span>           {" "}
            <p className="stat-description">successful farmer users</p>         {" "}
          </div>
          {" "}
          <div className="stat-card animate-fade-in-up delay-6">
            <span className="stat-number">4.8 ⭐</span>           {" "}
            <p className="stat-description">based on pilot testing feedback</p>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {/* ⚠️ NOTE: Marquee section removed from here. */}     {" "}
      {/* --- Additional Content Section (Empowering Farmers) --- */}     {" "}
      <section className="additional-content-section">
        {" "}
        <h3 className="section-heading animate-fade-in-up delay-7">
          Empowering Farmers with Technology          {" "}
        </h3>
        {" "}
        <p className="section-text animate-fade-in-up delay-8">
          Our platform offers a comprehensive suite of tools
          designed to simplify complex agricultural tasks.               From
          real-time sensor data integration to predictive analytics for pest
          outbreaks, AgriSense is               your trusted partner in
          achieving sustainable and profitable farming operations.          {" "}
        </p>
        {" "}
        <div className="cta-button-wrapper animate-fade-in-up delay-9">
          {" "}
          <button className="main-cta-button">Explore Features</button>         {" "}
        </div>
        {" "}
      </section>
      {/* --- NEW: Key Features Section --- */}     {" "}
      <section className="key-features-container">
        {" "}
        <h2 className="section-heading features-title animate-fade-in-up delay-10">
          Key Features          {" "}
        </h2>
        {" "}
        <div className="features-cards-wrapper">
          {/* Feature Card 1: Disease Detection */}
          {" "}
          <div className="feature-card animate-fade-in-up delay-11">
            <span className="feature-icon"> 🩺 </span>
            <h3 className="card-title">Disease Detection</h3>
            {" "}
            <p className="card-description">
              Spot issues before they spread. AgriSense
              uses AI-powered image                       analysis to identify
              plant diseases instantly.                  {" "}
            </p>
            {" "}
          </div>
          {/* Feature Card 2: Yield Forecasting */}             {" "}
          <div className="feature-card animate-fade-in-up delay-12">
            <span className="feature-icon"> ☁️ </span>
            <h3 className="card-title">Yield Forecasting</h3>
            {" "}
            <p className="card-description">
              Predict your productivity with confidence.
              Our LSTM-based prediction model                       analyzes
              weather patterns, soil data, and crop history to forecast expected
              yield.                  {" "}
            </p>
            {" "}
          </div>
          {/* Feature Card 3: Field Segmentation */}             {" "}
          <div className="feature-card animate-fade-in-up delay-13">
            <span className="feature-icon"> 🚁 </span>
            <h3 className="card-title">Field Segmentation</h3>
            {" "}
            <p className="card-description">
              See your farm in data-driven color.
              AgriSense leverages UNet                       segmentation models
              to differentiate diseased crops, weeds, and soil
              zones from drone or satellite images.                  {" "}
            </p>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {/* --- Stories Section Placeholder --- */}     {" "}
      <section className="stories-section">
        {" "}
        <h2 className="stories-title animate-fade-in-up delay-14">
          Stories Rooted in Change          {" "}
        </h2>
        {" "}
        <div className="rating-placeholder animate-fade-in-up delay-15">
          <span className="star-rating">⭐⭐⭐⭐ 4.2</span>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
    </div>
  );
};

export default Home;
