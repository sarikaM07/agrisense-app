import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapView.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ onAddMarker }) {
  useMapEvents({
    click(e) {
      onAddMarker(e.latlng);
    },
  });
  return null;
}

export default function MapView() {
  const [markers, setMarkers] = useState([
    { lat: 20.5937, lng: 78.9629, label: "Center of India" },
  ]);

  const handleAddMarker = latlng => {
    setMarkers(prev => [
      ...prev,
      { lat: latlng.lat, lng: latlng.lng, label: "Field marker" },
    ]);
  };

  return (
    <div className="map-page">
      <div className="map-inner">
        <h1 className="map-title">Interactive Field Map</h1>
        <p className="map-subtitle">Click anywhere on the map to drop a field marker.</p>
        <div className="map-container-wrap">
          <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map-leaflet">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            />
            <LocationMarker onAddMarker={handleAddMarker} />
            {markers.map((m, i) => (
              <Marker key={`${m.lat}-${m.lng}-${i}`} position={[m.lat, m.lng]}>
                <Popup>{m.label}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <div className="map-hills">
        <div className="map-hill-light" />
        <div className="map-hill-dark" />
      </div>
    </div>
  );
}
