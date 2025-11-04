import React, { useState } from 'react';
import "./Forecasting.css"; 

// --- Reusable Upload Box Component (Simplified for structure) ---
const UploadBox = ({ id, onFileSelect, selectedFile, label }) => (
    <div
        className={`image-upload-box ${id}`}
        onClick={() => document.getElementById(id).click()}
    >
        <input
            type="file"
            id={id}
            onChange={onFileSelect}
            style={{ display: 'none' }}
            accept="image/*"
        />

        {selectedFile ? (
            <p className="file-info">File ready: **{selectedFile.name}**</p>
        ) : (
            <>
                {/* Cloud Icon Placeholder */}
                <svg className="cloud-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 184.4V80c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v104.4c-47.5 10.6-88 38.6-114 74.9-3.7 5.1-5.6 11.2-5.6 17.5 0 16.5 13.5 30 30 30h336c16.5 0 30-13.5 30-30 0-6.3-2-12.4-5.6-17.5-26-36.3-66.5-64.3-114-74.9zm136 105.6h-336c-39.7 0-72 32.3-72 72s32.3 72 72 72h336c39.7 0 72-32.3 72-72s-32.3-72-72-72z"/></svg>
                <p className="drag-drop-text">
                    Drag & Drop **{label}**
                    <br />
                    or <span className="browse-link">browse</span>
                </p>
            </>
        )}
    </div>
);

// --- Main Component ---
const YieldForecasting = () => {
    const [selectedOriginalFile, setSelectedOriginalFile] = useState(null);
    const [selectedMaskedFile, setSelectedMaskedFile] = useState(null);
    const [pastYield, setPastYield] = useState('');
    const [ndvi, setNdvi] = useState('');
    const [weather, setWeather] = useState('Select');
    const [notes, setNotes] = useState('');

    // State to toggle between Input Form (false) and Results (true)
    const [showResults, setShowResults] = useState(false);

    // Simulated Output State
    const [predictedYield, setPredictedYield] = useState('N/A');
    const [uncertaintyRange, setUncertaintyRange] = useState('N/A');
    const [confidencePercentage, setConfidencePercentage] = useState('N/A');
    const [diseaseDetected, setDiseaseDetected] = useState('N/A');
    const [typeOfCrop, setTypeOfCrop] = useState('N/A');
    const [soilArea, setSoilArea] = useState('N/A');
    const [weedArea, setWeedArea] = useState('N/A');
    const [healthyArea, setHealthyArea] = useState('N/A');


    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Input Validation (Simplified)
        if (!selectedOriginalFile || !selectedMaskedFile || !pastYield || !ndvi || weather === 'Select') {
            alert("Please complete all required fields (Images, Past Yield, NDVI, and Weather).");
            return;
        }

        // 1. Simulate the "Field Segmentation" analysis (from previous steps)
        setSoilArea('35.2%');
        setWeedArea('5.8%');
        setHealthyArea('59.0%');
        
        // 2. Simulate the "Disease Detection" and "Yield Forecasting" results
        setDiseaseDetected('Early Blight (12%)');
        setTypeOfCrop('Tomato');
        setPredictedYield('6.2 tons/hectare');
        setUncertaintyRange('±0.4 tons/hectare');
        setConfidencePercentage('91%');

        // Toggle to the results screen
        setShowResults(true);
    };

    // --- Input Form (Image 1) ---
    const renderInputForm = () => (
        <form className="forecasting-form-wrapper" onSubmit={handleSubmit}>
            <div className="dual-column-layout">
                {/* Left Column: Image Uploads */}
                <div className="input-column image-upload-group">
                    <UploadBox 
                        id="file-upload-original"
                        onFileSelect={(e) => setSelectedOriginalFile(e.target.files[0])}
                        selectedFile={selectedOriginalFile}
                        label="Original Plant Image"
                    />
                    <UploadBox 
                        id="file-upload-masked"
                        onFileSelect={(e) => setSelectedMaskedFile(e.target.files[0])}
                        selectedFile={selectedMaskedFile}
                        label="RGB (Masked) Image"
                    />
                </div>

                {/* Right Column: Text Inputs */}
                <div className="input-column data-inputs-group">
                    <div className="input-field">
                        <label>Weather :</label>
                        <select value={weather} onChange={(e) => setWeather(e.target.value)}>
                            <option value="Select">Select</option>
                            <option value="Dry">Dry</option>
                            <option value="Humid">Humid</option>
                            <option value="Rainy">Rainy</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <label>Past Yield :</label>
                        <input
                            type="text"
                            placeholder="e.g., 45.7"
                            value={pastYield}
                            onChange={(e) => setPastYield(e.target.value)}
                        />
                    </div>

                    <div className="input-field">
                        <label>NDVI :</label>
                        <input
                            type="text"
                            placeholder="Type here"
                            value={ndvi}
                            onChange={(e) => setNdvi(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Row: Notes and Submit Button */}
            <div className="bottom-controls">
                <textarea
                    className="notes-input"
                    placeholder="Enter additional plant data or notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <div className="submit-and-gallery">
                    <div className="gallery-upload">
                         {/* Using simple text/icon placeholder for gallery upload */}
                        <svg className="gallery-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 480H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64zM245.5 129.5c9.2-9.2 23.3-11.9 35.8-5.3l120 64c11.3 6 18.7 17.5 18.7 30.1V368c0 14.7-11.8 26.5-26.5 26.5H238.9c-11.7 0-21.7-8.3-24-20l-20.9-110.1c-1.3-6.6 1.4-13.4 7.2-16.8l20-11.4c6.6-3.8 14.8-1.5 18.6 5.1s1.5 14.8-5.1 18.6l-11.3 6.5-12.8 67.4 12.8 6.5z"/></svg>
                        <p>IMAGES upload from gallery</p>
                        <button type="button" className="upload-btn">Upload</button>
                    </div>
                    <button type="submit" className="enter-btn">Enter</button>
                </div>
            </div>
        </form>
    );

    // --- Results Screen (Image 2) ---
    const renderResultsScreen = () => (
        <div className="results-container">
            <h1 className="results-title">Yield Forecasting</h1>

            {/* Section 1: Disease & Crop */}
            <div className="results-section">
                <p className="results-instruction">Kindly carry out the disease detection process for the inputs provided below.</p>
                <div className="results-field">
                    <label>Disease detected :</label>
                    <input type="text" readOnly value={diseaseDetected} />
                </div>
                <div className="results-field">
                    <label>Type of crop :</label>
                    <input type="text" readOnly value={typeOfCrop} />
                </div>
            </div>

            {/* Section 2: Area Segmentation */}
            <div className="results-section">
                <p className="results-instruction">Kindly carry out the yield forecasting process for the inputs provided below.</p>
                <div className="results-field">
                    <label>Soil Area :</label>
                    <input type="text" readOnly value={soilArea} />
                </div>
                <div className="results-field">
                    <label>Weed Area :</label>
                    <input type="text" readOnly value={weedArea} />
                </div>
                <div className="results-field">
                    <label>Healthy Area :</label>
                    <input type="text" readOnly value={healthyArea} />
                </div>
            </div>

            {/* Section 3: Input Data Review */}
            <div className="results-section">
                <div className="results-field">
                    <label>NDVI Report :</label>
                    <input type="text" readOnly value={ndvi || 'N/A'} />
                </div>
                <div className="results-field">
                    <label>Past Yield :</label>
                    <input type="text" readOnly value={pastYield || 'N/A'} />
                </div>
                <div className="results-field weather-dropdown-group">
                    <label>Weather :</label>
                    <div className="weather-display">
                        <p><span>•</span> {weather}</p>
                        <p><span>•</span> Humid</p>
                        <p><span>•</span> Rainy</p>
                    </div>
                </div>
            </div>
            
            <p className="analysis-success-message">The data analysis has been conducted successfully, and the findings are presented below.</p>

            {/* Final Yield Prediction */}
            <div className="prediction-summary">
                <p className="summary-field">Predicted Yield : <span>{predictedYield}</span></p>
                <p className="summary-field">Uncertainty Range : <span>{uncertaintyRange}</span></p>
                <p className="summary-field">Confidence Percentage : <span>{confidencePercentage}</span></p>
            </div>
        </div>
    );

    return (
        <div className="forecasting-page-wrapper">
            {showResults ? renderResultsScreen() : renderInputForm()}
            
            {/* Background elements */}
            <div className="background-design">
                <div className="curve-light"></div>
                <div className="curve-dark"></div>
            </div>
        </div>
    );
};

export default YieldForecasting;