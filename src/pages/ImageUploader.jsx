import React, {useState} from 'react';

export default function ImageUploader({onImage}){
  const [preview, setPreview] = useState(null);
  function handle(e){
    const file = e.target.files[0];
    if(!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onImage && onImage(file, url);
  }
  return (
    <div>
      <input type="file" accept="image/*" onChange={handle} />
      {preview && <img src={preview} alt="preview" style={{maxWidth:300,marginTop:8,borderRadius:6}} />}
    </div>
  )
}
