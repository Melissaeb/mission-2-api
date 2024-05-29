const premiumModel = require("../models/premiumModel");

exports.calculatePremium = (req, res) => {
  const { carValue, riskRating } = req.body;
  const minCarValue = 1885;
  const minRiskRating = 1;
  const maxRiskRating = 5;

  // Error handling:
  switch (true) {
    case carValue === "" || riskRating === "":
      res.status(400).json({ error: "One or more values are missing" });
      break;
    case !Number.isInteger(carValue) || !Number.isInteger(riskRating):
      res.status(400).json({
        error:
          "Car value and/or risk rating not recognised. Please use valid numbers",
      });
      break;
    case carValue < minCarValue ||
      riskRating < minRiskRating ||
      riskRating > maxRiskRating:
      res.status(400).json({
        error:
          "Car value or risk rating is outside of the accepted range. Please input a car value at or above 1885, and a risk rating between 1 and 5",
      });
      break;
  }

  // Output for correct inputs:
  const premium = premiumModel.calculatePremium(carValue, riskRating);
  res.json(premium);
};
