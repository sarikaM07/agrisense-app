import React, {useState} from 'react';
import { simpleForecast } from '../utils/forecasting';

export default function Forecasting(){
  const [input,setInput] = useState('2.3,2.7,3.1,2.9,3.5');
  const [out,setOut] = useState(null);

  function run(){
    const arr = input.split(',').map(s=>parseFloat(s.trim())).filter(Boolean);
    const f = simpleForecast(arr,3);
    setOut(f);
  }

  return (
    <div className="container">
      <h2>Yield Forecasting</h2>
      <div className="card">
        <p>Enter past yields (comma separated) to forecast next N periods.</p>
        <input value={input} onChange={e=>setInput(e.target.value)} />
        <div style={{marginTop:8}}>
          <button onClick={run}>Run forecast</button>
        </div>
        {out && (
          <div style={{marginTop:12}}>
            <h4>Forecast</h4>
            <pre>{JSON.stringify(out, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}