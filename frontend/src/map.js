import React, { useState, useEffect } from "react";
import DatamapsIndia from "react-datamaps-india";
import axios from "axios";

const MapChart = () => {
  const [advertisersData, setAdvertisersData] = useState([]);
  const [selectedStateData, setSelectedStateData] = useState(null);

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

  const handleHover = (value) => {
    const hoveredState = value.name;
    const dataForHoveredState = advertisersData.filter(
      (advertiser) => advertiser.state === hoveredState
    );
    setSelectedStateData(dataForHoveredState);
  };

  const handleClick = (value) => {
    const clickedState = value.name;
    const dataForClickedState = advertisersData.filter(
      (advertiser) => advertiser.state === clickedState
    );
    setSelectedStateData(dataForClickedState);
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
            if (!selectedStateData || selectedStateData.length === 0) {
              return <div>No data available</div>;
            }
            return (
              <div>
                {selectedStateData.map((advertiser, index) => (
                  <div key={index}>
                    <p>Advertiser: {advertiser.advertiser}</p>
                    <p>Total Spent: {advertiser.total_spent}</p>
                  </div>
                ))}
              </div>
            );
          }}
          onClick={({ value }) => handleClick(value)}
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
