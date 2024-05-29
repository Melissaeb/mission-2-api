exports.calculatePremium = (carValue, riskRating) => {
  const yearlyPremium = (carValue * riskRating) / 100;
  const monthlyPremium = yearlyPremium / 12;

  //fixed to 2 decimal places
  return {
    monthlyPremium: parseFloat(monthlyPremium.toFixed(2)),
    yearlyPremium: parseFloat(yearlyPremium.toFixed(2)),
  };
};
