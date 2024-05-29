exports.calculatePremium = (carValue, riskRating) => {
  const yearlyPremium = (carValue * riskRating) / 100;
  const monthlyPremium = yearlyPremium / 12;

  //fixed to 1 decimal place
  return {
    monthlyPremium: parseFloat(monthlyPremium.toFixed(1)),
    yearlyPremium: parseFloat(yearlyPremium.toFixed(1)),
  };
};
