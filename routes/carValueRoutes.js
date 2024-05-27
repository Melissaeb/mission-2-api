const express = require("express");
const router = express.Router();
const carValueController = require("../controllers/carValueController.js");

// Routes
router.post("/car-value", carValueController.calculateCarValue);

module.exports = router;
