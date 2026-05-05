import React, { useState, useRef } from 'react';
import './InnerPage.css';

const UploadBox = ({ id, file, onFile, isDragging, setDragging }) => {
  const ref = useRef();

  const onDragOver  = e => { e.preventDefault(); setDragging(true); };
  const onDragLeave = e => { e.preventDefault(); setDragging(false); };
  const onDrop      = e => {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      className={`upload-zone${isDragging ? ' dragging' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => ref.current?.click()}
    >
      <input
        ref={ref}
        id={id}
        type="file"
        accept="image/*"
        onChange={e => onFile(e.target.files[0])}
      />
      <svg className="cloud-upload-icon" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 16 12 12 8 16"/>
        <line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
      </svg>
      {file ? (
        <div className="file-selected">✅ {file.name}</div>
      ) : (
        <p className="upload-zone-text">
          Drag &amp; Drop to upload<br />
          or <span className="upload-browse-link">browse</span>
        </p>
      )}
    </div>
  );
};

export default function Forecasting() {
  const [originalFile, setOriginalFile]   = useState(null);
  const [maskedFile, setMaskedFile]       = useState(null);
  const [isDragOrig, setDragOrig]         = useState(false);
  const [isDragMask, setDragMask]         = useState(false);
  const [result, setResult]               = useState(null);
  const [loading, setLoading]             = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!originalFile || !maskedFile) {
      alert("Please upload both the original and masked images.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setResult({
        soilArea:    '35% (10.06 hectares)',
        weedArea:    '6% (10.06 hec/wee)',
        healthyArea: '74% (0.30 hectare)',
        riskAnalysis: [
          'Drought Risk: Low (12%)',
          'Pest Infestation Risk: Moderate (24%)',
          'Yield Variance Margin: +0.3 tons/ha',
        ],
        summaryNote:
          'This forecast suggests a healthy yield with steady upward growth. Timely irrigation and balanced nutrient management can help maintain productivity above the seasonal average.',
        previewUrl: originalFile ? URL.createObjectURL(originalFile) : null,
      });
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="inner-page-wrapper">
      {/* Decorative hills */}
      <div className="inner-hills-bg">
        <div className="inner-hill-light" />
        <div className="inner-hill-dark" />
      </div>

      <div className="inner-content">
        <h1 className="inner-page-title">Field Segmentation</h1>

        <p className="upload-zone-hint">
          click a clear photo of your crop or leaf— whether from your phone camera, drone, or stored gallery.
        </p>

        {/* Original Image upload */}
        <UploadBox
          id="orig-upload"
          file={originalFile}
          onFile={setOriginalFile}
          isDragging={isDragOrig}
          setDragging={setDragOrig}
        />
        <button
          className="upload-btn-dark"
          type="button"
          onClick={() => document.getElementById('orig-upload').click()}
        >
          Upload
        </button>

        <p className="upload-zone-hint" style={{ marginTop: 24 }}>
          Upload a clear RGB image of the plant to generate a segmented output that distinctly highlights the crop, weed, and soil regions for precise field analysis.
        </p>

        {/* Masked Image upload */}
        <UploadBox
          id="mask-upload"
          file={maskedFile}
          onFile={setMaskedFile}
          isDragging={isDragMask}
          setDragging={setDragMask}
        />
        <button
          className="upload-btn-dark"
          type="button"
          onClick={() => document.getElementById('mask-upload').click()}
        >
          Upload
        </button>

        {/* Submit */}
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="submit-btn-blue"
            disabled={loading}
          >
            {loading ? 'Analyzing…' : 'Submit'}
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className="loading-section">
            <div className="loading-spinner" />
            <p>Processing segmentation… Please wait</p>
          </div>
        )}

        {/* ===== RESULT OUTPUT ===== */}
        {result && (
          <div style={{ marginTop: 40 }}>
            <p style={{ color: '#4a7c3f', fontStyle: 'italic', fontSize: '0.9rem', marginBottom: 20 }}>
              The data analysis has been conducted successfully, and the findings are presented below.
            </p>

            <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {/* Segmented Image */}
              {result.previewUrl && (
                <img
                  src={result.previewUrl}
                  alt="Segmented field"
                  style={{ width: 280, height: 220, objectFit: 'cover', borderRadius: 10, border: '2px solid #c5d9b8' }}
                />
              )}

              {/* Results */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div className="result-row">
                  <strong>Soil Area :</strong><br />
                  <span style={{ fontSize: '0.85rem', color: '#5a7a5a' }}>{result.soilArea}</span>
                </div>
                <div className="result-row">
                  <strong>Weed Area :</strong><br />
                  <span style={{ fontSize: '0.85rem', color: '#5a7a5a' }}>{result.weedArea}</span>
                </div>
                <div className="result-row">
                  <strong>Healthy Area :</strong><br />
                  <span style={{ fontSize: '0.85rem', color: '#5a7a5a' }}>{result.healthyArea}</span>
                </div>

                <div className="result-row" style={{ marginTop: 16 }}>
                  <strong>📊 Risk Analysis</strong>
                  <ul className="result-bullets">
                    {result.riskAnalysis.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>

                <div className="result-row">
                  <strong>📝 Summary Note</strong>
                  <p style={{ fontSize: '0.85rem', color: '#5a7a5a', marginTop: 6, fontStyle: 'italic', lineHeight: 1.6 }}>
                    {result.summaryNote}
                  </p>
                </div>

                {/* Download card */}
                <div className="download-card" style={{ marginTop: 16 }}>
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