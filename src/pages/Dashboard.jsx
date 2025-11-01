import React from 'react';
import { Line } from 'react-chartjs-2';
import StatsCard from '../components/StatsCard';
import './Dashboard.css';

// ✅ Import and register chart.js modules
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Yield (tons)',
        data: [2.3, 2.7, 3.1, 2.9, 3.5, 3.8],
        borderColor: '#1c572b',
        backgroundColor: 'rgba(28, 87, 43, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Yield Trends' },
    },
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* 🌾 Stats Grid */}
      <div className="dashboard-stats">
        <div className="dashboard-card">
          <h3>Total Yield</h3>
          <ul>
            <li>320 tons</li>
            <li>Last 12 months</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3>Avg Health</h3>
          <ul>
            <li>82%</li>
            <li>NDVI Index</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3>Alerts</h3>
          <ul>
            <li>3 active</li>
            <li>Needs attention</li>
          </ul>
        </div>
      </div>

      {/* 📈 Chart Section */}
      <div className="dashboard-card chart-card">
        <h3>Yield Trend</h3>
        <Line data={data} options={options} />
      </div>

      {/* 🧾 Recent Events */}
      <div className="dashboard-card">
        <h3>Recent Events</h3>
        <ul>
          <li>Drone scan completed — Field A</li>
          <li>Disease alert — Field C</li>
        </ul>
      </div>
    </div>
  );
}
