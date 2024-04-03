// App.js
import React from "react";
import "./App.css";
import MapChart from "./map";

function App() {
  return (
    <div className="landing-page">
      <div className="content">
        <h1 className="title">India Political Advertisement Map</h1>
        <p className="description">
          Welcome to the India Political Advertisement Map. This map displays
          data on political advertisements across India. Explore different
          regions and discover insights into political advertising trends.
        </p>
        <div className="description1">
          <h2>Click on the pins to view details of political advertisers.</h2>
        </div>
        <div style={{ position: "relative" }}>
          {/* Pass handlePinClick function as a prop to MapChart */}
          <MapChart style={{ position: "relative" }} />
        </div>
      </div>
    </div>
  );
}

export default App;
