import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import './DiseaseDetection.css';

export default function DiseaseDetection() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🌾 Mock AI Disease Database
  const diseaseData = [
    {
      label: 'Leaf Blight',
      cause: 'Caused by fungal pathogens like *Helminthosporium turcicum*.',
    },
    {
      label: 'Powdery Mildew',
      cause: 'Caused by fungal spores that thrive in dry, warm climates.',
    },
    {
      label: 'Bacterial Spot',
      cause: 'Caused by *Xanthomonas campestris*, a bacterial infection.',
    },
    {
      label: 'Rust Disease',
      cause: 'Caused by rust fungi (*Puccinia spp.*) forming orange spores.',
    },
    {
      label: 'Nutrient Deficiency',
      cause: 'Caused by lack of nitrogen, potassium, or magnesium in soil.',
    },
    {
      label: 'Healthy Leaf',
      cause: 'No visible disease detected — leaf appears healthy and green!',
    },
  ];

  // 🌿 Simulated AI Prediction
  async function predictImage(file) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomDisease =
          diseaseData[Math.floor(Math.random() * diseaseData.length)];
        resolve({
          ...randomDisease,
          confidence: Math.random() * 0.3 + 0.7, // 70–100%
          debugImage: URL.createObjectURL(file),
        });
      }, 2000);
    });
  }

  async function handleImage(file) {
    setResult(null);
    setLoading(true);
    const r = await predictImage(file);
    setResult(r);
    setLoading(false);
  }

  return (
    <div className="disease-page">
      <section className="hero-section">
        <div className="hero-overlay">
          <h2 className="hero-title">🌿 Smart Disease Detection</h2>
          <p className="hero-description">
            Upload a leaf image to detect possible diseases and understand what
            causes them — powered by AI insights.
          </p>
        </div>
      </section>

      <div className="disease-card">
        <p className="instruction">
          Upload a clear image of your plant’s leaf below for instant analysis.
        </p>

        <ImageUploader onImage={handleImage} />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing your image… Please wait</p>
          </div>
        )}

        {result && (
          <div className="result-section">
            <h3>
              Disease: <span>{result.label}</span>
            </h3>
            <p>
              Confidence: <strong>{(result.confidence * 100).toFixed(1)}%</strong>
            </p>
            <p className="cause-text">
              <strong>Cause:</strong> {result.cause}
            </p>
            <img
              src={result.debugImage}
              alt="Detected leaf"
              className="result-image"
            />
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="footer-bottom">
          <p>© 2025 AgriSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

