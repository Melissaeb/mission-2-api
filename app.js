const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
require("dotenv").config();

const whitelist = [process.env.CLIENT_HOST];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", routes);

module.exports = app;
