const premiumModel = require("../models/premiumModel");

exports.calculatePremium = (req, res) => {
  const { carValue, riskRating } = req.body;
  const minCarValue = 1885;
  const minRiskRating = 1;
  const maxRiskRating = 5;

  // Error handling:
  if (
    !Number.isInteger(carValue) ||
    !Number.isInteger(riskRating) ||
    carValue < minCarValue ||
    riskRating < minRiskRating ||
    riskRating > maxRiskRating
  ) {
    return res.status(400).json({ error: "there is an error" });
  }

  // Output for correct inputs:
  const premium = premiumModel.calculatePremium(carValue, riskRating);
  res.json(premium);
};
