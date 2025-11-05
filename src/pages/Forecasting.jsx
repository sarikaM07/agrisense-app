import React, { useState } from 'react';
import "./Forecasting.css";



const UploadBox = ({ id, onFileSelect, selectedFile, label, isDragging, onDragEvents }) => (
    <div
        className={`image-upload-box ${id} ${isDragging ? 'dragging' : ''}`}
        {...onDragEvents}
        onClick={() => document.getElementById(id).click()}
    >
        <input
            type="file"
            id={id}
            onChange={onFileSelect}
            style={{ display: 'none' }}
            accept="image/*"
        />

        {selectedFile ? (
            <p className="file-info">File ready: **{selectedFile.name}**</p>
        ) : (
            <>
              
                <svg className="cloud-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 184.4V80c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v104.4c-47.5 10.6-88 38.6-114 74.9-3.7 5.1-5.6 11.2-5.6 17.5 0 16.5 13.5 30 30 30h336c16.5 0 30-13.5 30-30 0-6.3-2-12.4-5.6-17.5-26-36.3-66.5-64.3-114-74.9zm136 105.6h-336c-39.7 0-72 32.3-72 72s32.3 72 72 72h336c39.7 0 72-32.3 72-72s-32.3-72-72-72z"/></svg>
                <p className="drag-drop-text">
                    Drag & Drop **{label}**
                    <br />
                    or <span className="browse-link">browse</span>
                </p>
            </>
        )}
    </div>
);


const Forecasting = () => {
    
    const [selectedOriginalFile, setSelectedOriginalFile] = useState(null);
    const [selectedMaskedFile, setSelectedMaskedFile] = useState(null);
    

    const [isOriginalDragging, setIsOriginalDragging] = useState(false); 
    const [isMaskedDragging, setIsMaskedDragging] = useState(false); 

    const [soilArea, setSoilArea] = useState('N/A');
    const [weedArea, setWeedArea] = useState('N/A');
    const [healthyArea, setHealthyArea] = useState('N/A');


   
    const createDragHandlers = (setIsDragging, setFile) => ({
        onDragEnter: (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); },
        onDragOver: (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); },
        onDragLeave: (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); },
        onDrop: (e) => {
            e.preventDefault(); e.stopPropagation(); setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer.files[0];
                setFile(file);
                e.dataTransfer.clearData();
                console.log('File dropped:', file.name);
            }
        },
    });

    const originalDragHandlers = createDragHandlers(setIsOriginalDragging, setSelectedOriginalFile);
    const maskedDragHandlers = createDragHandlers(setIsMaskedDragging, setSelectedMaskedFile);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('--- Form Submitted ---');
        console.log('Original Image:', selectedOriginalFile ? selectedOriginalFile.name : 'N/A');
        console.log('Masked Image:', selectedMaskedFile ? selectedMaskedFile.name : 'N/A');
      
        if (selectedOriginalFile && selectedMaskedFile) {
            
            setSoilArea('35.2%');
            setWeedArea('5.8%');
            setHealthyArea('59.0%');
            alert("Analysis submitted. Results are displayed in the Output section.");
        } else {
            alert("Please upload both Original and Masked images.");
        }
    };
    

    return (
        <div className="forecasting-container">
            
            <div className="content-area">
                
                <div className="dual-upload-container">
                  
                    <div className="upload-column">
                        <p className="upload-header">Upload **Original Plant Image**</p>
                        <UploadBox 
                            id="file-upload-original"
                            onFileSelect={(e) => setSelectedOriginalFile(e.target.files[0])}
                            selectedFile={selectedOriginalFile}
                            label="Original Image"
                            isDragging={isOriginalDragging}
                            onDragEvents={originalDragHandlers}
                        />
                    </div>
                    
                
                    <div className="upload-column">
                        <p className="upload-header">Upload **RGB (Masked) Image**</p>
                        <UploadBox 
                            id="file-upload-masked"
                            onFileSelect={(e) => setSelectedMaskedFile(e.target.files[0])}
                            selectedFile={selectedMaskedFile}
                            label="Masked Image"
                            isDragging={isMaskedDragging}
                            onDragEvents={maskedDragHandlers}
                        />
                    </div>
                </div>

              
                <div className="upload-options minimal-upload">
                    <button className="upload-btn" onClick={() => document.getElementById('file-upload-original').click()}>Upload</button>
                </div>
            </div>


            
            <form className="controls-area minimal-controls" onSubmit={handleSubmit}>
                
               
                <div className="output-section">
                    <h3 className="output-header">Analysis Results :</h3>
                    <div className="output-field">
                        <label>Soil Area :</label>
                        <p className="output-value **soil**">{soilArea}</p>
                    </div>
                    <div className="output-field">
                        <label>Weed Area :</label>
                        <p className="output-value **weed**">{weedArea}</p>
                    </div>
                    <div className="output-field">
                        <label>Healthy Area :</label>
                        <p className="output-value **healthy**">{healthyArea}</p>
                    </div>
                </div>
               

                <button type="submit" className="enter-btn">Enter</button>
            </form>

         
            <div className="background-design">
                <div className="curve-light"></div>
                <div className="curve-dark"></div>
            </div>

        </div>
    );
};

export default Forecasting;