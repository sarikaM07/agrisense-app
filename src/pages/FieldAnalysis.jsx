import React, { useState } from 'react';
import './InnerPage.css';

export default function FieldAnalysis() {
  const initialInputs = {
    diseaseDetected: '',
    cropType: '',
    soilArea: '',
    weedArea: '',
    healthyArea: '',
    ndviReport: '',
    pastYield: '',
    weather: 'Dry',
  };

  const [inputs, setInputs]   = useState(initialInputs);
  const [output, setOutput]   = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]     = useState('');

  const weatherOptions = ['Dry', 'Rainy', 'Warm', 'Other'];

  const handleChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    if (output) setOutput(null);
    if (error) setError('');
  };

  const validateInputs = () => {
    const { soilArea, weedArea, healthyArea, ndviReport, pastYield } = inputs;
    if ([soilArea, weedArea, healthyArea, ndviReport, pastYield].some(v => isNaN(parseFloat(v)))) {
      setError("Please enter valid numerical values for all area, report, and yield fields.");
      return false;
    }
    if (parseFloat(weedArea) + parseFloat(healthyArea) > 100) {
      setError("Weed Area (%) + Healthy Area (%) cannot exceed 100%.");
      return false;
    }
    setError('');
    return true;
  };

  const handleForecast = e => {
    e.preventDefault();
    if (!validateInputs()) return;
    setIsLoading(true);
    setTimeout(() => {
      const soil    = parseFloat(inputs.soilArea) || 1;
      const healthy = parseFloat(inputs.healthyArea) || 0;
      const weed    = parseFloat(inputs.weedArea) || 0;
      const ndvi    = parseFloat(inputs.ndviReport) || 0.5;
      const past    = parseFloat(inputs.pastYield) || 5;

      let predictedYield = past * (1 + (healthy / 100) * 0.2 + ndvi * 0.1);
      if (inputs.diseaseDetected.toLowerCase().includes('rust') || weed > 20) predictedYield *= 0.85;
      else if (weed > 50) predictedYield *= 0.7;
      predictedYield = (predictedYield / soil).toFixed(2);

      let confidence = Math.max(80, Math.min(99, 95 - weed / 2 - (inputs.diseaseDetected.length > 0 ? 5 : 0))).toFixed(0);
      let uncertainty = ((100 - confidence) / 20).toFixed(2);

      setOutput({
        predictedYield: `${predictedYield} tons/hectare`,
        uncertaintyRange: `±${uncertainty} tons/hectare`,
        confidencePercentage: `${confidence}%`,
        riskAnalysis: [
          `Drought Risk: ${inputs.weather === 'Dry' ? 'High (35%)' : 'Low (12%)'}`,
          `Pest Infestation Risk: Moderate (24%)`,
          `Yield Variance Margin: ${uncertainty > 1 ? '-' : '+'}${uncertainty} tons/ha`,
        ],
        summaryNote:
          'This forecast suggests a healthy yield with steady upward growth. Timely irrigation and balanced nutrient management can help maintain productivity above the seasonal average.',
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="inner-page-wrapper">
      {/* Decorative hills */}
      <div className="inner-hills-bg">
        <div className="inner-hill-light" />
        <div className="inner-hill-dark" />
      </div>

      <div className="inner-content">
        <h1 className="inner-page-title">Yield Forcasting</h1>

        {error && (
          <div style={{
            background: '#fdecea', border: '1px solid #f5a3a3', borderRadius: 8,
            padding: '12px 16px', marginBottom: 16, color: '#b71c1c', fontSize: '0.88rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleForecast}>
          {/* Card 1: Disease & Crop */}
          <div className="inner-card">
            <p style={{ color: '#4a7c3f', fontStyle: 'italic', fontSize: '0.87rem', marginBottom: 18 }}>
              Kindly carry out the disease detection process for the inputs provided below.
            </p>

            <div style={{ marginBottom: 16 }}>
              <label className="field-label" htmlFor="yf-disease">Disease detected :</label>
              <input
                id="yf-disease"
                type="text"
                name="diseaseDetected"
                className="field-input"
                placeholder="Type your answer"
                value={inputs.diseaseDetected}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="yf-crop">Type of crop :</label>
              <input
                id="yf-crop"
                type="text"
                name="cropType"
                className="field-input"
                placeholder="Type your answer"
                value={inputs.cropType}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Card 2: Yield Forecasting Inputs (blue border = highlighted per Figma) */}
          <div className="inner-card" style={{ border: '2px solid #4a90e2' }}>
            <p style={{ color: '#4a7c3f', fontStyle: 'italic', fontSize: '0.87rem', marginBottom: 18 }}>
              Kindly carry out the yield forcasting process for the inputs provided below.
            </p>

            <div style={{ marginBottom: 16 }}>
              <label className="field-label" htmlFor="yf-soil">Soil Area :</label>
              <input
                id="yf-soil"
                type="number"
                step="0.1"
                name="soilArea"
                className="field-input"
                placeholder="Type your answer"
                value={inputs.soilArea}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="field-label" htmlFor="yf-weed">Weed Area :</label>
              <input
                id="yf-weed"
                type="number"
                step="1"
                name="weedArea"
                className="field-input"
                placeholder="Type your answer"
                value={inputs.weedArea}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="yf-healthy">Healthy Area :</label>
              <input
                id="yf-healthy"
                type="number"
                step="1"
                name="healthyArea"
                className="field-input"
                placeholder="Type your answer"
                value={inputs.healthyArea}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Card 3: NDVI + Yield + Weather */}
          <div className="inner-card">
            <div style={{ marginBottom: 16 }}>
              <label className="field-label" htmlFor="yf-ndvi">NDVI Report :</label>
              <input
                id="yf-ndvi"
                type="number"
                step="0.01"
                name="ndviReport"
                className="field-input"
                placeholder="Type your answer"
                value={inputs.ndviReport}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="field-label" htmlFor="yf-past">Past Yield :</label>
              <input
                id="yf-past"
                type="number"
                step="0.1"
                name="pastYield"
                className="field-input"
                placeholder="Type your answer"
                value={inputs.pastYield}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="yf-weather">Weather :</label>
              <select
                id="yf-weather"
                name="weather"
                className="field-input"
                value={inputs.weather}
                onChange={handleChange}
              >
                {weatherOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn-blue"
            disabled={isLoading}
          >
            {isLoading ? 'Forecasting…' : 'Submit'}
          </button>
        </form>

        {/* Loading */}
        {isLoading && (
          <div className="loading-section">
            <div className="loading-spinner" />
            <p>Calculating yield forecast…</p>
          </div>
        )}

        {/* ===== OUTPUT ===== */}
        {output && (
          <div style={{ marginTop: 40 }}>
            <h2 className="result-heading">Yield Forcasting</h2>
            <p style={{ color: '#4a7c3f', fontStyle: 'italic', fontSize: '0.9rem', marginBottom: 20 }}>
              The data analysis has been conducted successfully, and the findings are presented below.
            </p>

            <div className="inner-card">
              <div className="result-row">
                <strong>Predicted Yield:</strong>{' '}
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2a5a1a' }}>
                  {output.predictedYield}
                </span>
              </div>
              <div className="result-row">
                <strong>Uncertainty Range:</strong> {output.uncertaintyRange}
              </div>
              <div className="result-row">
                <strong>Confidence:</strong> {output.confidencePercentage}
              </div>

              <div className="result-row" style={{ marginTop: 16 }}>
                <strong>📊 Risk Analysis</strong>
                <ul className="result-bullets">
                  {output.riskAnalysis.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>

              <div className="result-row">
                <strong>📝 Summary Note</strong>
                <p style={{ fontSize: '0.85rem', color: '#5a7a5a', marginTop: 6, fontStyle: 'italic', lineHeight: 1.6 }}>
                  {output.summaryNote}
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
        )}
      </div>
    </div>
  );
}
