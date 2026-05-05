import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './Profile.css';

const farms = [
  {
    id: 1,
    name: 'Green Valley Farm',
    location: 'Ludhiana, Punjab',
    area: '25 acres',
    crops: ['Wheat', 'Rice', 'Mustard'],
    bg: 'linear-gradient(135deg, #6a9e4f, #4a7c3f)',
  },
  {
    id: 2,
    name: 'Sunrise Fields',
    location: 'Amritsar, Punjab',
    area: '18 acres',
    crops: ['Wheat', 'Corn'],
    bg: 'linear-gradient(135deg, #b8860b, #8a6914)',
  },
];

export default function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <div className="profile-inner">

        {/* ===== PROFILE CARD ===== */}
        <div className="profile-card">
          <div className="profile-avatar">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>

          <div className="profile-info">
            <div className="profile-name-row">
              <span className="profile-name">{user?.name || 'Rajesh Kumar'}</span>
              <span className="profile-badge">Premium</span>
            </div>
            <div className="profile-detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              {user?.email || 'rajesh.kumar@example.com'}
            </div>
            <div className="profile-detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              +91 80813 87855
            </div>
            <div className="profile-detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Punjab, India
            </div>
            <p className="profile-member">Member since January 2023</p>
          </div>

          <button className="profile-edit-btn">
            ✏️ Edit Profile
          </button>
        </div>

        {/* ===== STATS ROW ===== */}
        <div className="profile-stats-row">
          <div className="stat-mini-card">
            <div className="stat-mini-info">
              <div className="stat-mini-label">Total Farms</div>
              <div className="stat-mini-value">2</div>
            </div>
            <div className="stat-mini-icon stat-icon-green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
          </div>

          <div className="stat-mini-card">
            <div className="stat-mini-info">
              <div className="stat-mini-label">Active Alerts</div>
              <div className="stat-mini-value">3</div>
            </div>
            <div className="stat-mini-icon stat-icon-red">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </div>
          </div>

          <div className="stat-mini-card">
            <div className="stat-mini-info">
              <div className="stat-mini-label">Healthy Crops</div>
              <div className="stat-mini-value">85%</div>
            </div>
            <div className="stat-mini-icon stat-icon-green2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM GRID ===== */}
        <div className="profile-bottom-grid">

          {/* My Farms */}
          <div className="farms-card">
            <h3>My Farms</h3>
            {farms.map(farm => (
              <div key={farm.id} className="farm-item">
                <div className="farm-thumb-placeholder" style={{ background: farm.bg }} />
                <div className="farm-details">
                  <div className="farm-name">{farm.name}</div>
                  <div className="farm-location">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    </svg>
                    {farm.location}
                  </div>
                  <div className="farm-area">Area: {farm.area}</div>
                  <div className="farm-tags">
                    {farm.crops.map(c => (
                      <span key={c} className="farm-tag">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="actions-card">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <button className="action-btn action-scan" onClick={() => navigate('/disease')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.92c.04-.36.07-.73.07-1.08s-.03-.71-.07-1.08l2.32-1.8c.21-.16.27-.46.13-.7l-2.2-3.8c-.13-.25-.43-.34-.67-.25l-2.73 1.1c-.57-.44-1.18-.79-1.85-1.06L14.1 3.25C14.07 3 13.85 2.79 13.6 2.79h-3.2c-.25 0-.46.21-.5.46l-.42 2.9c-.67.27-1.28.62-1.85 1.06L4.93 6.11c-.25-.09-.54 0-.67.25l-2.2 3.8c-.14.24-.08.54.13.7l2.32 1.8c-.04.37-.07.74-.07 1.08s.03.71.07 1.08l-2.32 1.8c-.21.16-.27.46-.13.7l2.2 3.8c.13.25.43.34.67.25l2.73-1.1c.57.44 1.18.79 1.85 1.06l.41 2.9c.04.25.25.46.5.46h3.2c.25 0 .47-.21.5-.46l.42-2.9c.67-.27 1.28-.62 1.85-1.06l2.73 1.1c.25.09.54 0 .67-.25l2.2-3.8c.14-.24.08-.54-.13-.7l-2.32-1.8z"/>
                </svg>
                Scan Crops
              </button>

              <button className="action-btn action-disease" onClick={() => navigate('/disease')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 8C8 10 5.9 16.17 3.82 19.58c-.18.3.28.6.5.34C6 17.81 9 17 12 17c1.88 0 3.63.35 5.12 1.03C19.06 14.72 20 11.5 20 8c0-1.1-.9-2-2-2h-1z"/>
                </svg>
                Disease Detection
              </button>

              <button className="action-btn action-alerts" onClick={() => navigate('/dashboard')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
                Alerts
              </button>

              <button className="action-btn action-reports" onClick={() => navigate('/dashboard')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
                Generate Reports
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}