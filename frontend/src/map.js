import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import axios from "axios";
import indiaGeoJSON from "./India.geojson";

const Map = () => {
  const [selectedState, setSelectedState] = useState("");
  const [stateNames, setStateNames] = useState([]);
  const [postOfficeData, setPostOfficeData] = useState([]);
  const [selectedPostOffice, setSelectedPostOffice] = useState(null);
  const [backendOffline, setBackendOffline] = useState(false); // State to track if backend is offline

  useEffect(() => {
    axios
      .get("http://localhost:3001/statename")
      .then((response) => {
        setStateNames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching state names:", error);
        // Check if the error indicates backend is offline
        if (error.response && error.response.status === 503) {
          setBackendOffline(true);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `https://political-advertising-2.onrender.com/postoffice?statename=${selectedState}`
        )
        .then((response) => {
          setPostOfficeData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching post office data:", error);
          // Check if the error indicates backend is offline
          if (error.response && error.response.status === 503) {
            setBackendOffline(true);
          }
        });
    } else {
      axios
        .get("https://political-advertising-2.onrender.com/postoffice")
        .then((response) => {
          setPostOfficeData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching post office data:", error);
          // Check if the error indicates backend is offline
          if (error.response && error.response.status === 503) {
            setBackendOffline(true);
          }
        });
    }
  }, [selectedState]);

  const handleStateSelect = (event) => {
    setSelectedState(event.target.value);
  };

  const handleMarkerHover = (postOffice) => {
    setSelectedPostOffice(postOffice);
  };

  const handleMarkerLeave = () => {
    setSelectedPostOffice(null);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {backendOffline && (
        <div
          className="toast"
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            backgroundColor: "red",
            color: "white",
            padding: 10,
            borderRadius: 5,
          }}
        >
          Backend is offline. Please try again later.
        </div>
      )}
      <select
        value={selectedState}
        onChange={handleStateSelect}
        style={{
          width: "30%",
          height: "26px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          outline: "none",
          backgroundColor: "#fff",
          cursor: "pointer",
          textAlign: "center",
          textOverflow: "ellipsis",
          fontWeight: "bold",
          fontFamily: "Arial",
        }}
      >
        <option value="">India</option>
        {stateNames.map((stateName) => (
          <option key={stateName.statename} value={stateName.statename}>
            {stateName.statename}
          </option>
        ))}
      </select>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [78.9629, 22.5937],
        }}
        style={{
          width: "50rem",
          margin: 0,
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
        <g>
          {postOfficeData.map((postOffice) => (
            <Marker
              key={postOffice.pincode}
              coordinates={[postOffice.longitude, postOffice.latitude]}
              onMouseEnter={() => handleMarkerHover(postOffice)}
              onMouseLeave={handleMarkerLeave}
            >
              <circle
                cx={0}
                cy={0}
                r={postOffice.expense * 0.02}
                fill="rgba(255, 0, 0, 0.5)"
                strokeWidth={2}
              />
            </Marker>
          ))}
        </g>
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
