import React from "react";
import Map from "./map";

function App() {
  return (
    <div style={styles.landingPage}>
      <div style={styles.content}>
        <h1 style={styles.title}>Post Office Expense Map</h1>
        <p style={styles.description}>
          This map displays data on expenses of post offices across India.
          Explore different regions and discover insights into post office
          expense trends.
        </p>
        <div style={styles.mapContainer}>
          {/* Render the Map component */}
          <Map />
        </div>
      </div>
    </div>
  );
}

const styles = {
  landingPage: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#212121",
  },
  content: {
    textAlign: "center",
    padding: "40px",
    maxWidth: "800px",
    margin: "auto", // Added margin to center the content vertically
  },
  title: {
    fontSize: "3rem",
    color: "#64b5f6",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#ffffff",
    marginBottom: "40px",
  },
  mapContainer: {
    position: "relative",
  },
};

export default App;
