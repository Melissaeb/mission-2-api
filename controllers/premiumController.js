const premiumModel = require("../models/premiumModel");

exports.calculatePremium = (req, res) => {
  const { carValue, riskRating } = req.body;
  const minCarValue = 1885;
  const minRiskRating = 1;
  const maxRiskRating = 5;

  // Error handling:
  if (
    typeof carValue !== "number" ||
    typeof riskRating !== "number" ||
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
