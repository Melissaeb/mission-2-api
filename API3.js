

function calculatePremium(input) {
    const { car_value, risk_rating } = input;
  
    if (typeof car_value !== 'number' || typeof risk_rating !== 'number' ||
        car_value <= 0 || risk_rating < 1 || risk_rating > 5) {
      return { error: "there is an error" };
    }
  
    const yearly_premium = (car_value * risk_rating) / 100;
    const monthly_premium = yearly_premium / 12;
  
    //fixed to 1 decimal place 
    return {
      monthly_premium: parseFloat(monthly_premium.toFixed(1)),
      yearly_premium: parseFloat(yearly_premium.toFixed(1))
    };
  }
  
  module.exports = { calculatePremium };
  