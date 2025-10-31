import React, {useState} from 'react';
import ImageUploader from '../components/ImageUploader';
// import { predictImage } from '../utils/mockModel';

export default function DiseaseDetection(){
  const [result, setResult] = useState(null);
  const [loading,setLoading] = useState(false);

  async function handleImage(file, url){
    setLoading(true);
    // in real app: load tf model and run prediction
    const r = await predictImage(file);
    setResult(r);
    setLoading(false);
  }

  return (
    <div className="container">
      <h2>Disease Detection</h2>
      <div className="card">
        <p>Upload a leaf image — model will predict disease class and confidence.</p>
        <ImageUploader onImage={handleImage} />
        {loading && <p>Analyzing…</p>}
        {result && (
          <div style={{marginTop:12}}>
            <h3>Prediction: {result.label}</h3>
            <p>Confidence: {(result.confidence*100).toFixed(1)}%</p>
            <img src={result.debugImage} alt="debug" style={{maxWidth:320,borderRadius:6}} />
          </div>
        )}
      </div>
    </div>
  )
}
