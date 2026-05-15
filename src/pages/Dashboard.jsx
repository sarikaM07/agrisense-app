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
  const diseaseStats = {
    totalCases: 45,
    diseases: [
      { name: 'Leaf Blight', percentage: 40 },
      { name: 'Rust', percentage: 30 },
      { name: 'Powdery Mildew', percentage: 30 },
    ],
  };

  const areaStats = {
    totalArea: 100,
    breakdown: { healthy: 65, diseased: 15, weed: 12, soil: 8 },
  };

  const crops = [
    { name: 'Wheat', area: 40 },
    { name: 'Rice', area: 35 },
    { name: 'Corn', area: 25 },
  ];

  const ndviData = {
    current: 0.75,
    history: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'NDVI Index',
        data: [0.65, 0.70, 0.72, 0.68, 0.73, 0.75],
        borderColor: '#4a7c3f',
        backgroundColor: 'rgba(74, 124, 63, 0.15)',
        tension: 0.3,
      }],
    },
  };

  const weatherData = {
    current: { temperature: 28, humidity: 65, rainfall: 2.5 },
    forecast: [
      { day: 'Today', temp: 28, condition: 'Sunny' },
      { day: 'Tomorrow', temp: 27, condition: 'Partly Cloudy' },
      { day: 'Day 3', temp: 29, condition: 'Clear' },
    ],
  };

  const yieldData = {
    labels: ['2023', '2024', '2025'],
    datasets: [{
      label: 'Yield (tons/ha)',
      data: [4.5, 4.8, 4.2],
      borderColor: '#3a7bd5',
      backgroundColor: 'rgba(58, 123, 213, 0.12)',
      tension: 0.3,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-inner">
        <h1 className="dashboard-page-title">Farm Dashboard</h1>
        <p className="dashboard-page-subtitle">
          Overview of crop health, field coverage, and yield trends for your farms.
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Disease Analysis</h2>
            <div className="dashboard-metric">
              <span className="metric-label">Total Cases</span>
              <span className="metric-value">{diseaseStats.totalCases}</span>
            </div>
            {diseaseStats.diseases.map(disease => (
              <div key={disease.name} className="progress-row">
                <span>{disease.name}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${disease.percentage}%` }} />
                </div>
                <span className="progress-pct">{disease.percentage}%</span>
              </div>
            ))}
          </div>

          <div className="dashboard-card">
            <h2>Area Distribution</h2>
            <div className="dashboard-metric">
              <span className="metric-label">Total Area</span>
              <span className="metric-value">{areaStats.totalArea} ha</span>
            </div>
            {Object.entries(areaStats.breakdown).map(([type, percentage]) => (
              <div key={type} className="progress-row">
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percentage}%` }} />
                </div>
                <span className="progress-pct">{percentage}%</span>
              </div>
            ))}
          </div>

          <div className="dashboard-card">
            <h2>Crop Distribution</h2>
            <ul className="crop-list">
              {crops.map(crop => (
                <li key={crop.name}>
                  <span>{crop.name}</span>
                  <span>{crop.area} ha</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="dashboard-card chart-card">
            <h2>NDVI Report</h2>
            <div className="ndvi-header">
              <span>Current NDVI</span>
              <strong>{ndviData.current}</strong>
            </div>
            <div className="chart-wrap">
              <Line data={ndviData.history} options={chartOptions} />
            </div>
          </div>

          <div className="dashboard-card">
            <h2>Weather Report</h2>
            <div className="weather-current">
              <span className="weather-temp">{weatherData.current.temperature}°C</span>
              <span>Humidity: {weatherData.current.humidity}%</span>
              <span>Rainfall: {weatherData.current.rainfall}mm</span>
            </div>
            <div className="weather-forecast">
              {weatherData.forecast.map(day => (
                <div key={day.day} className="forecast-item">
                  <span>{day.day}</span>
                  <strong>{day.temp}°C</strong>
                  <span>{day.condition}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card chart-card">
            <h2>Yield History</h2>
            <div className="chart-wrap">
              <Line
                data={yieldData}
                options={{
                  ...chartOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Tons per Hectare' },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-hills">
        <div className="dashboard-hill-light" />
        <div className="dashboard-hill-dark" />
      </div>
    </div>
  );
}
