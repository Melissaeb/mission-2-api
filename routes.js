const express = require("express");
const router = express.Router();
const carValueController = require("./controllers/carValueController.js");
const premiumController = require("./controllers/premiumController.js");
const riskRatingController = require("./controllers/riskRatingController.js");
const helloWorldController = require("./controllers/helloWorldController.js");

// Routes
router.post("/car-value", carValueController.calculateCarValue);
router.post("/risk-rating", riskRatingController.getRiskRating);
router.post("/premium", premiumController.calculatePremium);
router.get("/", helloWorldController.getHelloWorld);

module.exports = router;
