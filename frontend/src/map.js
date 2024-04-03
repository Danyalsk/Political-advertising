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
      // Handle error: If API response is 400 or API is offline, use hardcoded data
      setAdvertisersData([
        {
          advertiser: "DEF Enterprises",
          state: "Karnataka",
          total_spent: "45000",
        },
        {
          advertiser: "AB Corporation",
          state: "Maharashtra",
          total_spent: "70000",
        },
        {
          advertiser: "YZA Corporation",
          state: "Telangana",
          total_spent: "53000",
        },
        {
          advertiser: "PQR Group",
          state: "Rajasthan",
          total_spent: "52000",
        },
        {
          advertiser: "MNO Industries",
          state: "West Bengal",
          total_spent: "48000",
        },
        {
          advertiser: "VWX Ltd",
          state: "Gujarat",
          total_spent: "49000",
        },
        {
          advertiser: "JKL Pvt Ltd",
          state: "Uttar Pradesh",
          total_spent: "55000",
        },
        {
          advertiser: "STU Co.",
          state: "Kerala",
          total_spent: "67000",
        },
        {
          advertiser: "GHI Ltd",
          state: "Tamil Nadu",
          total_spent: "60000",
        },
        {
          advertiser: "XYZ Company",
          state: "Delhi",
          total_spent: "50000",
        },
      ]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
