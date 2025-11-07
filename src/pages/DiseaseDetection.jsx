import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import './DiseaseDetection.css';

const API_BASE_URL = "https://agrisense-gno8.onrender.com";

// SidebarInput component (kept as is)
const SidebarInput = ({ label, options, type, name, selectedValue, onChange }) => (
    <div className="sidebar-input-group">
        <label className="sidebar-label">{label}</label>
        <div className="input-options-container">
            {options.map((option, index) => (
                <div key={index} className="option-item">
                    <input
                        type={type}
                        id={`${label}-${option}`}
                        name={name}
                        value={option}
                        checked={selectedValue === option}
                        onChange={onChange}
                    />
                    <label htmlFor={`${label}-${option}`}>{option}</label>

                    <span className="dummy-box"></span>
                </div>
            ))}
        </div>
    </div>
);


export default function DiseaseDetection() {
    const [cropTypeSelection, setCropTypeSelection] = useState('');
    const [moistureLevel, setMoistureLevel] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);


    // 2. 🚀 API Integration Function (Includes Robust Splitting Logic)
    async function predictImage(file) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Authentication required. Please log in first.");
            return null;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(
                `${API_BASE_URL}/api/v1/inference/disease`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || `API Error: ${res.status}`);
            }

            const data = await res.json();
            localStorage.setItem('debugData', JSON.stringify(data));
            console.log("Disease Detection API Response:", data);

            // Default fallbacks
            let crop = "Not Specified";
            let disease = "Detection Failed";

            // Use the confidence directly from predicted_prob
            let confidence = data.predicted_prob || data.confidence || 0;
            let predictedClass = data.predicted_class;

            // 🛑 CRITICAL LOGIC: Handle splitting of the result string (e.g., "Tomato_healthy")
            if (predictedClass && typeof predictedClass === 'string') {

                // 1. Standardize by replacing underscores (_) with spaces
                let standardizedClass = predictedClass.replace(/_/g, ' ');

                // 2. Split by space and filter out empty strings (just in case)
                let parts = standardizedClass.split(' ').filter(p => p.length > 0);

                if (parts.length > 0) {
                    // Crop is the first part (and capitalize it)
                    crop = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
                }
                if (parts.length > 1) {
                    // Disease is the rest of the parts (joined by space and capitalized)
                    let diseaseString = parts.slice(1).join(' ');
                    disease = diseaseString.charAt(0).toUpperCase() + diseaseString.slice(1);
                } else if (parts.length === 1) {
                    // If only one word is detected, use it as the crop and mark disease as 'Unspecified'
                    disease = "Unspecified Disease";
                }
            }
            // --- END CRITICAL LOGIC ---

            return {
                // Use the calculated values
                crop: crop,
                label: disease,

                // Since API is missing 'cause', use a custom message
                cause: data.cause || "Detailed cause information is missing from the model API response.",
                confidence: confidence,
                debugImage: URL.createObjectURL(file),
            };

        } catch (error) {
            console.error("Prediction failed:", error);
            alert(`Prediction failed: ${error.message}`);
            return null;
        }
    }

    async function handleImage(file) {
        setResult(null);
        setLoading(true);

        const r = await predictImage(file);

        if (r) {
            setResult(r);
        }
        setLoading(false);
    }

    // 3. Render
    return (
        <div className="disease-page-container">

            <div className="disease-content-layout">

                <aside className="sidebar">

                    <SidebarInput
                        label="Crop Type:"
                        name="cropTypeSelection"
                        options={['Wheat', 'Rice', 'Corn', 'Soybeans']}
                        type="radio"
                        selectedValue={cropTypeSelection}
                        onChange={(e) => setCropTypeSelection(e.target.value)}
                    />


                    <SidebarInput
                        label="Moisture Level:"
                        name="moistureLevel"
                        options={['Low', 'Medium', 'High']}
                        type="radio"
                        selectedValue={moistureLevel}
                        onChange={(e) => setMoistureLevel(e.target.value)}
                    />


                    <div className="sidebar-input-group">
                        <label className="sidebar-label">Disease Symptoms</label>
                        <input
                            type="text"
                            placeholder="Enter"
                            className="symptoms-input"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                        />
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
                                <span className="gallery-text">IMAGES <br /> upload from gallery</span>
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

                            {/* DISPLAY: Uses the correctly parsed values */}
                            <h3>
                                Crop/Species: <span>{result.crop}</span>
                            </h3>
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

                </main>
            </div>


            <div className="copyright-footer">
                <p>Privacy Policy | Support | Contact Us</p>
                <p>© 2025 AgriSense</p>
            </div>
        </div>
    );
} 