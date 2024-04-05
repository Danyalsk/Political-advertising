// Map.js

import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import axios from "axios";
import indiaGeoJSON from "./India.geojson";

const Map = () => {
  const [selectedPostOffice, setSelectedPostOffice] = useState(null);
  const [postOfficeData, setPostOfficeData] = useState([]);

  useEffect(() => {
    // Fetch post office data from API
    axios.get("http://localhost:3001/postoffice").then((response) => {
      setPostOfficeData(response.data);
    });
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [78.9629, 22.5937], // India center coordinates
        }}
        style={{
          width: "50rem",
          margin: 0, // Set margin to 0
          padding: 0,
        }}
      >
        <Geographies geography={indiaGeoJSON}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.properties.name}
                geography={geo}
                fill="purple"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
        {postOfficeData.map((postOffice) => (
          <Marker
            key={postOffice.pincode}
            coordinates={[postOffice.longitude, postOffice.latitude]}
            onMouseEnter={() => setSelectedPostOffice(postOffice)}
            onMouseLeave={() => setSelectedPostOffice(null)}
          >
            <circle
              cx={0}
              cy={0}
              r={postOffice.expense * 0.02} // Adjust the radius based on expense
              fill="rgba(255, 0, 0, 0.5)"
              strokeWidth={2}
            />
          </Marker>
        ))}
      </ComposableMap>
      {selectedPostOffice && (
        <div
          style={{
            position: "absolute",
            top: selectedPostOffice.latitude,
            left: selectedPostOffice.longitude,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "2px",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h1>Expense: ${selectedPostOffice.expense}</h1>
          <h2>{selectedPostOffice.officename}</h2>
          <p>
            {selectedPostOffice.regionname}, {selectedPostOffice.statename}{" "}
            {selectedPostOffice.pincode}
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;
