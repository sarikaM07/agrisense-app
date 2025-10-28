import React from 'react';
export default function StatsCard({title,value,caption}){
  return (
    <div className="card">
      <h4>{title}</h4>
      <h2>{value}</h2>
      <small>{caption}</small>
    </div>
  )
}