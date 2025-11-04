import React, { useState } from 'react';
import ImageUploader from './ImageUploader'; // ⬅️ पाथ सही है क्योंकि दोनों एक ही फ़ोल्डर में हैं
import './DiseaseDetection.css';

// ➡️ Enhanced Sidebar Input Component (Checkboxes/Radio buttons के लिए)
const SidebarInput = ({ label, options, type }) => (
  <div className="sidebar-input-group">
    <label className="sidebar-label">{label}</label>
    <div className="input-options-container">
      {options.map((option, index) => (
        <div key={index} className="option-item">
          <input 
            type={type} // 'checkbox' या 'radio'
            id={`${label}-${option}`}
            name={label}
            value={option.toLowerCase().replace(' ', '-')}
          />
          <label htmlFor={`${label}-${option}`}>{option}</label>
          {/* डिज़ाइन में दिए गए खाली चेकबॉक्स/रेडियो बॉक्स के लिए डमी स्पैन */}
          <span className="dummy-box"></span> 
        </div>
      ))}
    </div>
  </div>
);


export default function DiseaseDetection() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // आपका बीमारी का डेटा
  const diseaseData = [
    { label: 'Leaf Blight', cause: 'Caused by fungal pathogens like *Helminthosporium turcicum*.' },
    { label: 'Powdery Mildew', cause: 'Caused by fungal spores that thrive in dry, warm climates.' },
    { label: 'Bacterial Spot', cause: 'Caused by *Xanthomonas campestris*, a bacterial infection.' },
    { label: 'Rust Disease', cause: 'Caused by rust fungi (*Puccinia spp.*) forming orange spores.' },
    { label: 'Nutrient Deficiency', cause: 'Caused by lack of nitrogen, potassium, or magnesium in soil.' },
    { label: 'Healthy Leaf', cause: 'No visible disease detected — leaf appears healthy and green!' },
  ];

  async function predictImage(file) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomDisease =
          diseaseData[Math.floor(Math.random() * diseaseData.length)];
        resolve({
          ...randomDisease,
          confidence: Math.random() * 0.3 + 0.7, 
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
    <div className="disease-page-container">
      
      <div className="disease-content-layout">
        
        {/* 🌿 Sidebar: Crop Type, Moisture Level, Symptoms */}
        <aside className="sidebar">
          {/* <h3>Parameters</h3> को हटा दिया गया है क्योंकि डिज़ाइन में यह नहीं है */}
          
          {/* 🌾 Crop Type (Checkboxes) */}
          <SidebarInput 
            label="Crop Type:" 
            options={['Wheat', 'Rice', 'Corn', 'Soybeans']} // डिज़ाइन के अनुसार विकल्प
            type="checkbox"
          />
          
          {/* 💧 Moisture Level (Radio Buttons) */}
          <SidebarInput 
            label="Moisture Level:"
            options={['Low', 'Medium', 'High']}
            type="radio"
          />
          
          {/* 🔍 Disease Symptoms (Text Input) */}
          <div className="sidebar-input-group">
            <label className="sidebar-label">Disease Symptoms</label>
            <input type="text" placeholder="Enter" className="symptoms-input" />
          </div>

          {/* Analyze Button */}
          <button className="analyze-button" disabled={loading}>
            Analyze
          </button>
        </aside>

        {/* 3. Main Content Area */}
        <main className="main-content">
          <div className="detection-card-container"> {/* मेन कार्ड कंटेनर (डैश बॉर्डर वाला) */}
            
            {/* Main Content Card (Header and Uploader) */}
            <div className="main-detection-card"> 
              
              {/* Header Section */}
              <div className="detection-header">
                <span className="leaf-icon">🌿</span>
                <h2 className="detection-title">Smart Disease Detection</h2>
              </div>
              
              <p className="detection-tagline">
                Upload a leaf image to detect possible diseases and understand what causes them — powered by AI insights.
              </p>

              {/* Image Uploader Area */}
              <div className="uploader-area">
                
                {/* Cloud Icon (आपके पुराने डिज़ाइन से लिया गया) */}
                <div className="image-icon-placeholder">
                   <span className="upload-leaf-icon">⬆️</span> 
                </div>

                <p className="upload-instruction-main">Upload a clear image of your plant’s leaf below for instant analysis.</p>
                
                {/* ImageUploader कॉम्पोनेंट */}
                <div className="image-uploader-wrapper">
                  {/* यहां ImageUploader कॉम्पोनेंट आएगा, जिसमें Choose File बटन होगा */}
                  <ImageUploader onImage={handleImage} />
                </div>
              </div>

            </div> 

            {/* Images and Upload Button (नीचे का भाग) */}
            <div className="gallery-and-upload-section">
                <div className="gallery-link">
                    <span className="gallery-icon">🖼️</span>
                    <span className="gallery-text">IMAGES <br/> upload from gallery</span>
                </div>
                <button className="main-upload-btn" type="button">
                    Upload
                </button>
            </div>
          </div>
          
          {/* Result Section (यहां परिणाम दिखाई देगा) */}
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing your image… Please wait</p>
            </div>
          )}

          {result && (
            <div className="result-section">
              <h3>
                Detection Result: <span>{result.label}</span>
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

        </main>
      </div>

     
    </div>
  );
}