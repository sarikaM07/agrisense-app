import React from 'react';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  // Disease statistics
  const diseaseStats = {
    totalCases: 45,
    diseases: [
      { name: 'Leaf Blight', percentage: 40 },
      { name: 'Rust', percentage: 30 },
      { name: 'Powdery Mildew', percentage: 30 }
    ]
  };

  // Area distribution data
  const areaStats = {
    totalArea: 100,
    breakdown: {
      healthy: 65,
      diseased: 15,
      weed: 12,
      soil: 8
    }
  };

  // Crop distribution data
  const crops = [
    { name: 'Wheat', area: 40 },
    { name: 'Rice', area: 35 },
    { name: 'Corn', area: 25 }
  ];

  // NDVI data
  const ndviData = {
    current: 0.75,
    history: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'NDVI Index',
        data: [0.65, 0.70, 0.72, 0.68, 0.73, 0.75],
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        tension: 0.3
      }]
    }
  };

  // Weather data
  const weatherData = {
    current: {
      temperature: 28,
      humidity: 65,
      rainfall: 2.5
    },
    forecast: [
      { day: 'Today', temp: 28, condition: 'Sunny' },
      { day: 'Tomorrow', temp: 27, condition: 'Partly Cloudy' },
      { day: 'Day 3', temp: 29, condition: 'Clear' }
    ]
  };

  // Yield history data
  const yieldData = {
    labels: ['2023', '2024', '2025'],
    datasets: [{
      label: 'Yield (tons/ha)',
      data: [4.5, 4.8, 4.2],
      backgroundColor: '#3498db',
      borderColor: '#2980b9',
      borderWidth: 1
    }]
  };

  return (
    <div className="dashboard-container">
      <h1>Farm Dashboard</h1>
      
      <div className="dashboard-grid">
        {/* Disease Analysis Section */}
        <div className="dashboard-card disease-section">
          <h2>Disease Analysis</h2>
          <div className="disease-stats">
            <div className="total-cases">
              <h3>Total Cases</h3>
              <span>{diseaseStats.totalCases}</span>
            </div>
            <div className="disease-breakdown">
              {diseaseStats.diseases.map(disease => (
                <div key={disease.name} className="disease-item">
                  <span className="disease-name">{disease.name}</span>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${disease.percentage}%` }}
                    ></div>
                  </div>
                  <span className="percentage">{disease.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Area Distribution Section */}
        <div className="dashboard-card area-section">
          <h2>Area Distribution</h2>
          <div className="area-stats">
            <div className="total-area">
              <h3>Total Area</h3>
              <span>{areaStats.totalArea} hectares</span>
            </div>
            <div className="area-breakdown">
              {Object.entries(areaStats.breakdown).map(([type, percentage]) => (
                <div key={type} className="area-item">
                  <span className="area-type">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="percentage">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Crop Distribution Section */}
        <div className="dashboard-card crop-section">
          <h2>Crop Distribution</h2>
          <div className="crop-list">
            {crops.map(crop => (
              <div key={crop.name} className="crop-item">
                <span className="crop-name">{crop.name}</span>
                <span className="crop-area">{crop.area} ha</span>
              </div>
            ))}
          </div>
        </div>

        {/* NDVI Report Section */}
        <div className="dashboard-card ndvi-section">
          <h2>NDVI Report</h2>
          <div className="ndvi-chart">
            <div className="ndvi-current">
              <h3>Current NDVI</h3>
              <span className="ndvi-value">{ndviData.current}</span>
            </div>
            <Line 
              data={ndviData.history}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false }
                }
              }}
            />
            <div className="ndvi-scale">
              <div className="scale-gradient"></div>
              <div className="scale-labels">
                <span>0.0</span>
                <span>0.5</span>
                <span>1.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Section */}
        <div className="dashboard-card weather-section">
          <h2>Weather Report</h2>
          <div className="current-weather">
            <div className="weather-main">
              <span className="temperature">{weatherData.current.temperature}°C</span>
              <span className="humidity">Humidity: {weatherData.current.humidity}%</span>
              <span className="rainfall">Rainfall: {weatherData.current.rainfall}mm</span>
            </div>
            <div className="weather-forecast">
              {weatherData.forecast.map(day => (
                <div key={day.day} className="forecast-day">
                  <span className="day">{day.day}</span>
                  <span className="temp">{day.temp}°C</span>
                  <span className="condition">{day.condition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Yield History Section */}
        <div className="dashboard-card yield-section">
          <h2>Yield History</h2>
          <div className="yield-chart">
            <Line
              data={yieldData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Tons per Hectare'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
