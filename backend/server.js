const express = require("express");
const app = express();
const pgPool = require("./libs/pg");
const port = 3001;

const cors = require("cors");

// Configure CORS to allow requests only from http://localhost:3000

app.use(cors());
// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.get("/postoffice", async (req, res, next) => {
  try {
    const { statename } = req.query; // Extract statename from the query parameters
    let query =
      "SELECT officename, pincode, regionname, statename, expense, longitude, latitude FROM post_offices";

    if (statename) {
      // If statename is provided, add a WHERE clause to filter by statename
      query += ` WHERE statename = '${statename}'`;
    }

    query += " LIMIT 450"; // Add LIMIT clause at the end

    const { rows } = await pgPool.query(query);
    res.json(rows);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

app.get("/statename", async (req, res, next) => {
  try {
    const query = "SELECT DISTINCT statename FROM post_offices";
    const { rows } = await pgPool.query(query);
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
