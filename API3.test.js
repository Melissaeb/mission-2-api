const { calculatePremium } = require('./API3');

test('Valid input with car value and risk rating', () => {
  const input = { car_value: 6614, risk_rating: 5 };
  const output = { monthly_premium: 27.6, yearly_premium: 330.7 };
  expect(calculatePremium(input)).toEqual(output);
});

test('Valid input with different car value and risk rating', () => {
  const input = { car_value: 61000, risk_rating: 4 };
  const output = { monthly_premium: 203.3, yearly_premium: 2440 };
  expect(calculatePremium(input)).toEqual(output);
});

test('Invalid input with non-numeric car value', () => {
  const input = { car_value: "aSDadfgAFAD", risk_rating: 1 };
  const output = { error: "there is an error" };
  expect(calculatePremium(input)).toEqual(output);
});

test('Invalid input with risk rating out of range', () => {
  const input = { car_value: 6614, risk_rating: 6 };
  const output = { error: "there is an error" };
  expect(calculatePremium(input)).toEqual(output);
});

test('Invalid input with missing parameters', () => {
  const input = { car_value: 6614 };
  const output = { error: "there is an error" };
  expect(calculatePremium(input)).toEqual(output);
});

test('Invalid input with missing parameters', () => {
    const input = { risk_rating: 3 };
    const output = { error: "there is an error" };
    expect(calculatePremium(input)).toEqual(output);
  });
