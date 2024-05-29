const request = require("supertest");
const expressApp = require("../app");

describe("POST /api/premium", () => {
  it("Valid input with car value and risk rating", async () => {
    const response = await request(expressApp)
      .post("/api/premium")
      .send({ carValue: 6614, riskRating: 5 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      monthlyPremium: 27.6,
      yearlyPremium: 330.7,
    });
  });

  it("Valid input with different car value and risk rating", async () => {
    const response = await request(expressApp)
      .post("/api/premium")
      .send({ carValue: 61000, riskRating: 4 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      monthlyPremium: 203.3,
      yearlyPremium: 2440,
    });
  });

  it("Invalid input with non-numeric car value", async () => {
    const response = await request(expressApp)
      .post("/api/premium")
      .send({ carValue: "aSDadfgAFAD", riskRating: 1 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "there is an error" });
  });

  it("Invalid input with risk rating out of range", async () => {
    const response = await request(expressApp)
      .post("/api/premium")
      .send({ carValue: 6614, riskRating: 6 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "there is an error" });
  });

  it("Invalid input with missing parameters", async () => {
    const response = await request(expressApp)
      .post("/api/premium")
      .send({ carValue: 6614, riskRating: "" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "there is an error" });
  });

  it("Invalid input with missing parameters", async () => {
    const response = await request(expressApp)
      .post("/api/premium")
      .send({ carValue: "", riskRating: 3 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "there is an error" });
  });
});
