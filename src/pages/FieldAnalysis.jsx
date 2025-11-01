import React from 'react';

export default function FieldAnalysis(){
  return (
    <div className="container">
      <h2>Field Analysis</h2>
      <div className="card">
        <p>This page would show segmented fields, soil metrics and recommendations.</p>
        <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=60" alt="field" style={{width:'100%',borderRadius:8}} />
        <h3>Sample insights</h3>
        <ul>
          <li>Field A: low nitrogen — fertilize in 2 weeks</li>
          <li>Field B: irrigation recommended</li>
        </ul>
      </div>
    </div>
  )
} 