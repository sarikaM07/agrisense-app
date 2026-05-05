import React, { useState, useRef } from 'react';
import './InnerPage.css';

const API_BASE_URL = "https://agrisense-gno8.onrender.com";

export default function DiseaseDetection() {
  const [cropType, setCropType]     = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult]         = useState(null);
  const [loading, setLoading]       = useState(false);
  const fileInputRef = useRef();

  // ===== API Logic (preserved from original) =====
  async function predictImage(file) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Authentication required. Please log in first.");
      return null;
    }
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/inference/disease`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || `API Error: ${res.status}`);
      }
      const data = await res.json();
      let crop = "Not Specified";
      let disease = "Detection Failed";
      let confidence = data.predicted_prob || data.confidence || 0;
      let predictedClass = data.predicted_class;

      if (predictedClass && typeof predictedClass === 'string') {
        let parts = predictedClass.replace(/_/g, ' ').split(' ').filter(p => p.length > 0);
        if (parts.length > 0) crop = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        if (parts.length > 1) {
          let d = parts.slice(1).join(' ');
          disease = d.charAt(0).toUpperCase() + d.slice(1);
        } else {
          disease = "Unspecified Disease";
        }
      }

      return {
        crop,
        label: disease,
        cause: data.cause || "Pathogen-driven infection. Manage with appropriate fungicide and crop rotation.",
        confidence,
        previewUrl: URL.createObjectURL(file),
      };
    } catch (error) {
      console.error("Prediction failed:", error);
      alert(`Prediction failed: ${error.message}`);
      return null;
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) { alert("Please select an image first."); return; }
    setResult(null);
    setLoading(true);
    const r = await predictImage(selectedFile);
    if (r) setResult(r);
    setLoading(false);
  };

  // ===== Drag handlers =====
  const onDragOver  = e => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = e => { e.preventDefault(); setIsDragging(false); };
  const onDrop      = e => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files[0]) setSelectedFile(e.dataTransfer.files[0]);
  };

  const getSymptoms = (disease) => {
    const symptoms = {
      'powdery mildew': [
        'White or grayish powdery spots on leaves, stems, and flowers',
        'Leaves may curl, twist, or become distorted',
        'In severe cases, leaves turn yellow and fall off',
        'Reduced growth and yield of the plant',
      ],
      'leaf blight': [
        'Brown or tan spots with yellow halos on leaves',
        'Rapid spreading in humid conditions',
        'Leaves wither and die prematurely',
        'Significant reduction in photosynthesis',
      ],
      'rust': [
        'Orange-red powdery pustules on leaves and stems',
        'Premature leaf drop',
        'Yellowing of leaf surface',
        'Reduced plant vigor and yield',
      ],
    };
    const key = Object.keys(symptoms).find(k => disease.toLowerCase().includes(k));
    return key ? symptoms[key] : [
      'Discoloration and spots on leaves',
      'Wilting or stunted growth',
      'Reduced yield potential',
      'Possible spread to adjacent plants',
    ];
  };

  return (
    <div className="inner-page-wrapper">
      {/* Decorative hills */}
      <div className="inner-hills-bg">
        <div className="inner-hill-light" />
        <div className="inner-hill-dark" />
      </div>

      <div className="inner-content">
        <h1 className="inner-page-title">Disease Detection</h1>

        {/* Crop type input */}
        <div style={{ marginBottom: 20 }}>
          <label className="field-label" htmlFor="crop-type-input">Type of crop :</label>
          <input
            id="crop-type-input"
            type="text"
            className="field-input"
            placeholder="Type your answer"
            value={cropType}
            onChange={e => setCropType(e.target.value)}
            style={{ maxWidth: 280 }}
          />
        </div>

        {/* Upload hint */}
        <p className="upload-zone-hint">
          click a clear photo of your crop or leaf— whether from your phone camera, drone, or stored gallery.
        </p>

        {/* Upload Zone */}
        <div
          className={`upload-zone${isDragging ? ' dragging' : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={e => setSelectedFile(e.target.files[0])}
          />
          <svg className="cloud-upload-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="16 16 12 12 8 16"/>
            <line x1="12" y1="12" x2="12" y2="21"/>
            <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
          </svg>
          {selectedFile ? (
            <div className="file-selected">
              ✅ {selectedFile.name}
            </div>
          ) : (
            <p className="upload-zone-text">
              Drag &amp; Drop to upload<br />
              or <span className="upload-browse-link">browse</span>
            </p>
          )}
        </div>

        {/* Upload button */}
        <button
          className="upload-btn-dark"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Analyzing…' : 'Upload'}
        </button>

        {/* Loading */}
        {loading && (
          <div className="loading-section">
            <div className="loading-spinner" />
            <p>Analyzing your image… Please wait</p>
          </div>
        )}

        {/* ===== RESULT OUTPUT ===== */}
        {result && (
          <div style={{ marginTop: 40 }}>
            <h2 className="result-heading">Disease Detected</h2>

            <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {/* Image */}
              <img
                src={result.previewUrl}
                alt="Detected crop"
                style={{ width: 180, height: 160, objectFit: 'cover', borderRadius: 10 }}
              />

              {/* Details */}
              <div style={{ flex: 1, minWidth: 220 }}>
                <div className="result-row">
                  <strong>Crop/Species :</strong> {result.crop}
                </div>
                <div className="result-row">
                  <strong>Disease :</strong> {result.label}
                </div>
                {result.confidence > 0 && (
                  <div className="result-row">
                    <strong>Confidence :</strong> {(result.confidence * 100).toFixed(1)}%
                  </div>
                )}
                <div className="result-row" style={{ marginTop: 12 }}>
                  <strong>Symptoms:</strong>
                  <ul className="result-bullets">
                    {getSymptoms(result.label).map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                {/* Download report */}
                <div className="download-card">
                  <div>
                    <div className="download-card-label">📋 Download Report</div>
                    <div className="download-actions">
                      <button className="download-action-btn">
                        <div className="download-action-icon">📄</div>
                        Download PDF Report
                      </button>
                      <button className="download-action-btn">
                        <div className="download-action-icon">🤝</div>
                        Share to Advisor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}