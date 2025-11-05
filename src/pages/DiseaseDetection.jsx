import React, { useState } from 'react';
import ImageUploader from './ImageUploader'; 
import './DiseaseDetection.css';


const SidebarInput = ({ label, options, type }) => (
  <div className="sidebar-input-group">
    <label className="sidebar-label">{label}</label>
    <div className="input-options-container">
      {options.map((option, index) => (
        <div key={index} className="option-item">
          <input 
            type={type} 
            id={`${label}-${option}`}
            name={label}
            value={option.toLowerCase().replace(' ', '-')}
          />
          <label htmlFor={`${label}-${option}`}>{option}</label>
        
          <span className="dummy-box"></span> 
        </div>
      ))}
    </div>
  </div>
);


export default function DiseaseDetection() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


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
        
       
        <aside className="sidebar">
          
          <SidebarInput 
            label="Crop Type:" 
            options={['Wheat', 'Rice', 'Corn', 'Soybeans']} 
            type="checkbox"
          />
          
         
          <SidebarInput 
            label="Moisture Level:"
            options={['Low', 'Medium', 'High']}
            type="radio"
          />
          
          
          <div className="sidebar-input-group">
            <label className="sidebar-label">Disease Symptoms</label>
            <input type="text" placeholder="Enter" className="symptoms-input" />
          </div>

         
          <button className="analyze-button" disabled={loading}>
            Analyze
          </button>
        </aside>

       
        <main className="main-content">
          <div className="detection-card-container"> 
            
           
            <div className="main-detection-card"> 
              
              
              <div className="detection-header">
                <span className="leaf-icon">🌿</span>
                <h2 className="detection-title">Smart Disease Detection</h2>
              </div>
              
              <p className="detection-tagline">
                Upload a leaf image to detect possible diseases and understand what causes them — powered by AI insights.
              </p>

             
              <div className="uploader-area">
                
               
                <div className="image-icon-placeholder">
                   <span className="upload-leaf-icon">⬆️</span> 
                </div>

                <p className="upload-instruction-main">Upload a clear image of your plant’s leaf below for instant analysis.</p>
                
                
                <div className="image-uploader-wrapper">
                  
                  <ImageUploader onImage={handleImage} />
                </div>
              </div>

            </div> 

         
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