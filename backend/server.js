const express = require("express");
const app = express();
const port = 3001;
const pgPool = require("./libs/pg");
const cors = require("cors");

app.use(cors());

app.get("/individual-spent", async (req, res) => {
  const query =
    "SELECT advertiser, state, SUM(amount_spent) AS total_spent  FROM advertiser_spending GROUP BY advertiser, state ";

  const { rows } = await pgPool.query(query);
  res.json(rows);
});

app.get("/state-spent", async (req, res) => {
  const query =
    "SELECT state, SUM(amount_spent) AS total_spent FROM advertiser_spending GROUP BY state";

  const { rows } = await pgPool.query(query);
  res.json(rows);
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
