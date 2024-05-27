const express = require("express");
const app = express();
const carValueRoutes = require("./routes/carValueRoutes");

// Middleware to parse JSON
app.use(express.json());

app.use("/api", carValueRoutes);

module.exports = app;
