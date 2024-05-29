const request = require("supertest");
const expressApp = require("../app");

describe("POST /api/premium", () => {
  test("Valid input with car value and risk rating", async () => {
    const response = await request(expressApp)
      .post("/api/premium")
      .send({ carValue: 6614, riskRating: 5 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      monthlyPremium: 27.56,
      yearlyPremium: 330.7,
    });
  });

  const minCarValue = 1885;
  const mostExpensiveCarValue = 26200000;
  const minRiskRating = 1;
  const maxRiskRating = 5;

  const test2Cases = [
    {
      carValue: minCarValue,
      riskRating: minRiskRating,
      expectedYearlyPremium: 18.85,
      expectedMonthlyPremium: 1.57,
    },
    {
      carValue: mostExpensiveCarValue,
      riskRating: maxRiskRating,
      expectedYearlyPremium: 1310000,
      expectedMonthlyPremium: 109166.67,
    },
  ];

  test2Cases.forEach(
    ({
      carValue,
      riskRating,
      expectedMonthlyPremium,
      expectedYearlyPremium,
    }) => {
      test(`Valid input with boundary risk ratings and car values (carValue: ${carValue}, riskRating: ${riskRating})`, async () => {
        const response = await request(expressApp)
          .post("/api/premium")
          .send({ carValue, riskRating });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          monthlyPremium: expectedMonthlyPremium,
          yearlyPremium: expectedYearlyPremium,
        });
      });
    }
  );

  const test3Cases = [
    { carValue: 6614, riskRating: 0 },
    { carValue: 6614, riskRating: 6 },
    { carValue: 6614, riskRating: -2 },
    { carValue: minCarValue - 1, riskRating: 3 },
    { carValue: -6614, riskRating: 3 },
    { carValue: 0, riskRating: 3 },
  ];

  test3Cases.forEach(({ carValue, riskRating }) => {
    test(`Invalid input with car value or risk rating outside range (carValue: ${carValue}, riskRating: ${riskRating})`, async () => {
      const response = await request(expressApp)
        .post("/api/premium")
        .send({ carValue, riskRating });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error:
          "Car value or risk rating is outside of the accepted range. Please input a car value at or above 1885, and a risk rating between 1 and 5",
      });
    });
  });

  const test4Cases = [
    { carValue: "aSDadfgAFAD", riskRating: 1 },
    { carValue: 6614, riskRating: "ashd" },
  ];

  test4Cases.forEach(({ carValue, riskRating }) => {
    test(`Invalid input with non-numeric car value or risk rating (carValue: ${carValue}, riskRating: ${riskRating})`, async () => {
      const response = await request(expressApp)
        .post("/api/premium")
        .send({ carValue, riskRating });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error:
          "Car value and/or risk rating not recognised. Please use valid numbers",
      });
    });
  });

  const test5Cases = [
    { carValue: "", riskRating: 1 },
    { carValue: 6614, riskRating: "" },
  ];

  test5Cases.forEach(({ carValue, riskRating }) => {
    test(`Invalid input with missing parameters (carValue: ${carValue}, riskRating: ${riskRating})`, async () => {
      const response = await request(expressApp)
        .post("/api/premium")
        .send({ carValue, riskRating });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "One or more values are missing",
      });
    });
  });
});
