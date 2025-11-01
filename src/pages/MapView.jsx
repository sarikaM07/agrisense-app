import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon fix for default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Component to handle map clicks
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
    { lat: 20.5937, lng: 78.9629, label: "Center of India 🌿" },
  ]);

  const handleAddMarker = (latlng) => {
    setMarkers((prev) => [
      ...prev,
      { lat: latlng.lat, lng: latlng.lng, label: "Custom Marker" },
    ]);
  };

  return (
    <div style={{ width: "100%", height: "calc(100vh - 70px)" }}>
      <h2
        style={{
          textAlign: "center",
          padding: "10px",
          background: "#0b3d2e",
          color: "white",
          margin: 0,
        }}
      >
        🌍 AgriSense Interactive Map
      </h2>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            <Popup>{m.label}</Popup>
          </Marker>
        ))}

        <LocationMarker onAddMarker={handleAddMarker} />
      </MapContainer>
    </div>
  );
}
