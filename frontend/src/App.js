// App.js
import React from "react";
import "./App.css";
import MapChart from "./map";

function App() {
  return (
    <div className="landing-page ">
      <div className="content">
        <h1 className="title">India PA</h1>
        <p className="description">
          Explore data on political advertisements in India.
        </p>
        <div style={{ position: "relative" }}>
          <MapChart style={{ position: "relative" }} />
        </div>
      </div>
    </div>
  );
}

export default App;
