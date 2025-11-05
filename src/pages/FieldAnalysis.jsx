import React, { useState } from "react";
import "./FieldAnalysis.css";

const App = () => {
    const initialInputs = {
        diseaseDetected: "",
        cropType: "",
        soilArea: "", // in hectares
        weedArea: "", // in % of total area
        healthyArea: "", // in % of total area
        ndviReport: "", // NDVI value
        pastYield: "", // Previous yield
        weather: "Sunny", // Default selection
    };

    const [inputs, setInputs] = useState(initialInputs);
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(""); // Weather options

    const weatherOptions = ["Moderate", "Warm", "Cold"];

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
        if (output) setOutput(null);
        if (error) setError("");
    };

    const validateInputs = () => {
        const { soilArea, weedArea, healthyArea, ndviReport, pastYield } = inputs;

        if (
            isNaN(parseFloat(soilArea)) ||
            isNaN(parseFloat(weedArea)) ||
            isNaN(parseFloat(healthyArea)) ||
            isNaN(parseFloat(ndviReport)) ||
            isNaN(parseFloat(pastYield))
        ) {
            setError(
                "Please enter valid numerical values for all area, report, and yield fields."
            );
            return false;
        }

        const weedPercent = parseFloat(weedArea);
        const healthyPercent = parseFloat(healthyArea);
        if (weedPercent + healthyPercent > 100) {
            setError(
                "The total of Weed Area (%) and Healthy Area (%) cannot exceed 100%."
            );
            return false;
        }

        setError("");
        return true;
    };

    const handleForecast = (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        setIsLoading(true);

        setTimeout(() => {
            const soil = parseFloat(inputs.soilArea) || 1;
            const healthy = parseFloat(inputs.healthyArea) || 0;
            const weed = parseFloat(inputs.weedArea) || 0;
            const ndvi = parseFloat(inputs.ndviReport) || 0.5;
            const past = parseFloat(inputs.pastYield) || 5;

            let predictedYield = past * (1 + (healthy / 100) * 0.2 + ndvi * 0.1);

            if (inputs.diseaseDetected.toLowerCase().includes("rust") || weed > 20) {
                predictedYield *= 0.85;
            } else if (weed > 50) {
                predictedYield *= 0.7;
            }

            predictedYield = (predictedYield / soil).toFixed(2);

            let confidence =
                95 - weed / 2 - (inputs.diseaseDetected.length > 0 ? 5 : 0);
            confidence = Math.max(80, Math.min(99, confidence)).toFixed(0);

            let uncertainty = (100 - confidence) / 20;

            setOutput({
                predictedYield: predictedYield + " tons/hectare",
                uncertaintyRange: `±${uncertainty.toFixed(2)} tons/hectare`,
                confidencePercentage: `${confidence}%`,
            });

            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="app-container">
            {" "}
            <div className="main-content">
                {" "}
                <h1 className="main-header">
                    <span className="highlight-text">Yield</span>{" "}
                    Forecast                {" "}
                </h1>
                {" "}
                {error && (
                    <div className="error-message" role="alert">
                        {error}                   {" "}
                    </div>
                )}
                {" "}
                <form onSubmit={handleForecast}>
                    {" "}
                    <div className="card">
                        {" "}
                        <h2 className="section-header">
                            Please analyze the disease and crop
                            for the inputs below.                        {" "}
                        </h2>
                        {" "}
                        <div className="form-grid">
                            {" "}
                            <div className="form-group">
                                {" "}
                                <label htmlFor="diseaseDetected" className="form-label">
                                    Disease Detected:
                                    {" "}
                                </label>
                                {" "}
                                <input
                                    type="text"
                                    id="diseaseDetected"
                                    name="diseaseDetected"
                                    value={inputs.diseaseDetected}
                                    onChange={handleChange}
                                    placeholder="Type your answer (e.g., Rust, None)"
                                    className="form-input"
                                    required
                                />
                                {" "}
                            </div>
                            {" "}
                            <div className="form-group">
                                {" "}
                                <label htmlFor="cropType" className="form-label">
                                    Type of Crop:
                                    {" "}
                                </label>
                                {" "}
                                <input
                                    type="text"
                                    id="cropType"
                                    name="cropType"
                                    value={inputs.cropType}
                                    onChange={handleChange}
                                    placeholder="Type your answer (e.g., Wheat, Rice)"
                                    className="form-input"
                                    required
                                />
                                {" "}
                            </div>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="card">
                        {" "}
                        <h2 className="section-header">
                            Please complete the yield forecasting
                            process for the inputs below.                        {" "}
                        </h2>
                        {" "}
                        <div className="form-grid">
                            {/* Area Inputs */}
                            {" "}
                            <div className="space-y-4">
                                {" "}
                                <div className="form-group">
                                    {" "}
                                    <label htmlFor="soilArea" className="form-label">
                                        Soil Area
                                        (Hectares):                                    {" "}
                                    </label>
                                    {" "}
                                    <input
                                        type="number"
                                        step="0.1"
                                        id="soilArea"
                                        name="soilArea"
                                        value={inputs.soilArea}
                                        onChange={handleChange}
                                        placeholder="Type your answer (e.g., 10)"
                                        className="form-input"
                                        required
                                    />
                                    {" "}
                                </div>
                                {" "}
                                <div className="form-group">
                                    {" "}
                                    <label htmlFor="weedArea" className="form-label">
                                        Weed Area (%):
                                        {" "}
                                    </label>
                                    {" "}
                                    <input
                                        type="number"
                                        step="1"
                                        id="weedArea"
                                        name="weedArea"
                                        value={inputs.weedArea}
                                        onChange={handleChange}
                                        placeholder="Type your answer (e.g., 5)"
                                        className="form-input"
                                        required
                                    />
                                    {" "}
                                </div>
                                {" "}
                                <div className="form-group">
                                    {" "}
                                    <label htmlFor="healthyArea" className="form-label">
                                        Healthy Area (%):
                                        {" "}
                                    </label>
                                    {" "}
                                    <input
                                        type="number"
                                        step="1"
                                        id="healthyArea"
                                        name="healthyArea"
                                        value={inputs.healthyArea}
                                        onChange={handleChange}
                                        placeholder="Type your answer (e.g., 90)"
                                        className="form-input"
                                        required
                                    />
                                    {" "}
                                </div>
                                {" "}
                            </div>
                            {" "}
                            <div className="space-y-4">
                                {" "}
                                <div className="form-group">
                                    {" "}
                                    <label htmlFor="ndviReport" className="form-label">
                                        NDVI Report (0.0 to
                                        1.0):                                    {" "}
                                    </label>
                                    {" "}
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="ndviReport"
                                        name="ndviReport"
                                        value={inputs.ndviReport}
                                        onChange={handleChange}
                                        placeholder="Type your answer (e.g., 0.75)"
                                        className="form-input"
                                        required
                                    />
                                    {" "}
                                </div>
                                {" "}
                                <div className="form-group">
                                    {" "}
                                    <label htmlFor="pastYield" className="form-label">
                                        Previous Yield
                                        (Tons/Hectare):                                    {" "}
                                    </label>
                                    {" "}
                                    <input
                                        type="number"
                                        step="0.1"
                                        id="pastYield"
                                        name="pastYield"
                                        value={inputs.pastYield}
                                        onChange={handleChange}
                                        placeholder="Type your answer (e.g., 6.5)"
                                        className="form-input"
                                        required
                                    />
                                    {" "}
                                </div>
                                {" "}
                                <div className="form-group">
                                    {" "}
                                    <label htmlFor="weather" className="form-label">
                                        Weather
                                        (Current/Forecasted):                                    {" "}
                                    </label>
                                    {" "}
                                    <select
                                        id="weather"
                                        name="weather"
                                        value={inputs.weather}
                                        onChange={handleChange}
                                        className="form-input form-select"
                                        required
                                    >
                                        {" "}
                                        {weatherOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                        {" "}
                                    </select>
                                    {" "}
                                </div>
                                {" "}
                            </div>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="button-wrapper">
                        {" "}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={
                                isLoading
                                    ? "submit-button submit-button-loading"
                                    : "submit-button"
                            }
                        >
                            {" "}
                            {isLoading ? (
                                <>
                                    {" "}
                                    <svg
                                        className="spinner"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        {" "}
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        {" "}
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                        {" "}
                                    </svg>
                                    Forecasting...
                                    {" "}
                                </>
                            ) : (
                                "Calculate Yield Forecast"
                            )}
                            {" "}
                        </button>
                        {" "}
                    </div>
                    {" "}
                </form>
                {" "}
                {output && (
                    <div className="card result-card">
                        {" "}
                        <p className="result-text-muted">
                            The data analysis has been
                            successfully conducted, and the conclusions are presented below.
                            {" "}
                        </p>
                        {" "}
                        <div className="space-y-4">
                            {" "}
                            <div className="result-row">
                                {" "}
                                <span className="result-text">Predicted Yield:</span>
                                {" "}
                                <span className="result-value-main">
                                    {output.predictedYield}
                                    {" "}
                                </span>
                                {" "}
                            </div>
                            {" "}
                            <div className="result-row">
                                {" "}
                                <span className="result-text">Uncertainty Range:</span>
                                {" "}
                                <span className="result-value-secondary">
                                    {output.uncertaintyRange}
                                    {" "}
                                </span>
                                {" "}
                            </div>
                            {" "}
                            <div className="result-row">
                                {" "}
                                <span className="result-text">Confidence Percentage:</span>
                                {" "}
                                <span className="result-value-confidence">
                                    {" "}
                                    {output.confidencePercentage}
                                </span>
                                {" "}
                            </div>
                            {" "}
                        </div>
                        {" "}
                    </div>
                )}
                {" "}
            </div>
            {" "}
        </div>
    );
};

export default App;
