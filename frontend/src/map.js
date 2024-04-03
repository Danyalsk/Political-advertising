import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const svgCode = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="pin"><path fill="#f05542" d="M8 1C5.239 1 3 3.357 3 6.264S8 15 8 15s5-5.829 5-8.736C13 3.357 10.761 1 8 1zm0 2.925a1.667 1.755 0 0 1 1.667 1.754A1.667 1.755 0 0 1 8 7.434a1.667 1.755 0 0 1-1.667-1.755A1.667 1.755 0 0 1 8 3.925z"></path></svg>
`;

const svgUrl = `data:image/svg+xml;base64,${btoa(svgCode)}`;

const customIcon = icon({
  iconUrl: svgUrl,
  iconSize: [32, 32], // size of the icon
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
}); // Import leaflet.css for correct styles

const MapChart = () => {
  const advertisersData = [
    {
      advertiser: "DEF Enterprises",
      latitude: 12.9716,
      longitude: 77.5946,
      total_spent: "45000",
    },
    {
      advertiser: "AB Corporation",
      latitude: 19.076,
      longitude: 72.8777,
      total_spent: "70000",
    },
    {
      advertiser: "YZA Corporation",
      latitude: 17.385,
      longitude: 78.4867,
      total_spent: "53000",
    },
    {
      advertiser: "PQR Group",
      latitude: 26.9124,
      longitude: 75.7873,
      total_spent: "52000",
    },
    {
      advertiser: "MNO Industries",
      latitude: 22.5726,
      longitude: 88.3639,
      total_spent: "48000",
    },
    {
      advertiser: "VWX Ltd",
      latitude: 22.2587,
      longitude: 71.1924,
      total_spent: "49000",
    },
    {
      advertiser: "JKL Pvt Ltd",
      latitude: 26.8467,
      longitude: 80.9462,
      total_spent: "55000",
    },
    {
      advertiser: "STU Co.",
      latitude: 10.8505,
      longitude: 76.2711,
      total_spent: "67000",
    },
    {
      advertiser: "GHI Ltd",
      latitude: 11.1271,
      longitude: 78.6569,
      total_spent: "60000",
    },
    {
      advertiser: "XYZ Company",
      latitude: 28.7041,
      longitude: 77.1025,
      total_spent: "50000",
    },
  ];

  return (
    <div className="map-container">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {advertisersData.map((advertiser, index) => (
          <Marker
            key={index}
            position={[advertiser.latitude, advertiser.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div className="popup-content">
                <p className="advertiser">
                  Advertiser: {advertiser.advertiser}
                </p>
                <p className="total-spent">
                  Total Spent: {advertiser.total_spent}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapChart;
