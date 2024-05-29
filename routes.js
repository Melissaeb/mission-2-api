const express = require("express");
const router = express.Router();
const carValueController = require("./controllers/carValueController.js");
const premiumController = require("./controllers/premiumController.js");

// Routes
router.post("/car-value", carValueController.calculateCarValue);
router.post("/premium", premiumController.calculatePremium);

module.exports = router;
