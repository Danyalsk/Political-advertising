import React, { useState, useEffect } from "react";
import DatamapsIndia from "react-datamaps-india";
import axios from "axios";

const MapChart = () => {
  const [advertisersData, setAdvertisersData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/individual-spent"
      );
      setAdvertisersData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [hoveredStateData, setHoveredStateData] = useState(null);

  const handleHover = (value) => {
    const hoveredState = value.name;
    const dataForHoveredState = advertisersData.filter(
      (advertiser) => advertiser.state === hoveredState
    );
    setHoveredStateData(dataForHoveredState);
  };

  const filteredData = advertisersData.reduce((acc, current) => {
    acc[current.state] = { value: current.total_spent };
    return acc;
  }, {});

  return (
    <div
      style={{
        minHeight: "10vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "80%", maxWidth: "800px" }}>
        <DatamapsIndia
          regionData={filteredData}
          hoverComponent={({ value }) => {
            handleHover(value);
            return (
              <div>
                {hoveredStateData &&
                  hoveredStateData.map((advertiser, index) => (
                    <div key={index}>
                      <p>Advertiser: {advertiser.advertiser}</p>
                      <p>Total Spent: {advertiser.total_spent}</p>
                    </div>
                  ))}
              </div>
            );
          }}
          mapLayout={{
            startColor: "#b3d1ff",
            endColor: "#005ce6",
            hoverTitle: "Count",
            noDataColor: "#f5f5f5",
            borderColor: "#8D8D8D",
            hoverColor: "blue",
            hoverBorderColor: "green",
          }}
        />
      </div>
    </div>
  );
};

export default MapChart;
