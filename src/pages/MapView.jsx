import React from 'react';
import { Line } from 'react-chartjs-2';
import StatsCard from '../components/StatsCard';

// minimal chart example using react-chartjs-2
export default function Dashboard(){
  const data = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun'],
    datasets:[{label:'Yield (tons)',data:[2.3,2.7,3.1,2.9,3.5,3.8],fill:false}]
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        <StatsCard title="Total Yield" value="320 t" caption="Last 12 months" />
        <StatsCard title="Avg Health" value="82%" caption="NDVI" />
        <StatsCard title="Alerts" value="3" caption="Needs attention" />
      </div>

      <div className="card" style={{marginTop:12}}>
        <h3>Yield Trend</h3>
        <Line data={data} />
      </div>

      <div className="card" style={{marginTop:12}}>
        <h3>Recent Events</h3>
        <ul>
          <li>Drone scan completed — Field A</li>
          <li>Disease alert — Field C</li>
        </ul>
      </div>
    </div>
  )
}