import React from 'react';
import StatsCard from '../components/StatsCard';

export default function Home(){
  return (
    <div className="container">
      <section className="hero" style={{backgroundImage:'url(https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=60)'}}>
        <h2 style={{fontSize:28}}>Smart Farming. Smarter Insights.</h2>
        <p>Monitor crop health, detect disease, and forecast yield — all in one intelligent dashboard.</p>
        <div className="stats-grid">
          <StatsCard title="Accuracy" value="90%" caption="Model accuracy" />
          <StatsCard title="Farms" value="120+" caption="Farms analyzed" />
          <StatsCard title="Rating" value="4.8 ⭐" caption="User satisfaction" />
        </div>
      </section>

      <section style={{marginTop:20}} className="card">
        <h3>Quick features</h3>
        <div className="features-grid">
          <div className="card">Disease detection from images</div>
          <div className="card">Map view & field segmentation</div>
          <div className="card">Yield forecasting</div>
          <div className="card">Role-based access</div>
        </div>
      </section>
    </div>
  )
}