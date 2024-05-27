const request = require("supertest");
const expressApp = require("../app");

describe("POST /api/car-value", () => {
  it("gives correct response for valid inputs", async () => {
    const response = await request(expressApp)
      .post("/api/car-value")
      .send({ model: "Corolla", year: 2015 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ value: 9615 });
  });

  const test2Cases = [
    { model: "axela", year: 2009, expectedValue: 6309 },
    { model: "COROLLA", year: 2015, expectedValue: 9615 },
    { model: "aXeLa", year: 2009, expectedValue: 6309 },
  ];

  test2Cases.forEach(({ model, year, expectedValue }) => {
    it(`is case-insensitive for model inputs (${model})`, async () => {
      const response = await request(expressApp)
        .post("/api/car-value")
        .send({ model, year });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ value: expectedValue });
    });
  });

  const test3Cases = [
    { model: "Ford Mustang GT", year: 2018, expectedValue: 18518 },
    { model: "RX7", year: 2023, expectedValue: 6223 },
    { model: "RX-8", year: 2006, expectedValue: 6206 },
  ];

  test3Cases.forEach(({ model, year, expectedValue }) => {
    it(`gives correct response when model input included spaces, numbers and/or other symbols (${model})`, async () => {
      const response = await request(expressApp)
        .post("/api/car-value")
        .send({ model, year });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ value: expectedValue });
    });
  });

  it("gives correct response when model input only includes numbers", async () => {
    const response = await request(expressApp)
      .post("/api/car-value")
      .send({ model: "216", year: 2023 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ value: 2023 });
  });

  const test5Cases = [
    { model: "Accord", year: 1885, expectedValue: 6285 },
    { model: "Accord", year: 2024, expectedValue: 6424 },
  ];

  test5Cases.forEach(({ model, year, expectedValue }) => {
    it(`gives correct response when year is just inside accepted range (${year})`, async () => {
      const response = await request(expressApp)
        .post("/api/car-value")
        .send({ model, year });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ value: expectedValue });
    });
  });

  const test6Cases = [
    { model: "Corolla", year: 1884 },
    { model: "Corolla", year: 0 },
    { model: "Corolla", year: 3000 },
    { model: "Corolla", year: -2015 },
  ];

  test6Cases.forEach(({ model, year }) => {
    it(`gives error response when year is outside accepted range (1885 - current year) (test: ${year})`, async () => {
      const response = await request(expressApp)
        .post("/api/car-value")
        .send({ model, year });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: `Year is outside of the accepted range. Please input a year between 1885 and the current year`,
      });
    });
  });

  it("gives error response when model does not include letters or numbers (@*()$)", async () => {
    const response = await request(expressApp)
      .post("/api/car-value")
      .send({ model: "@*()$", year: 2023 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Model not recognised. Please input a valid model",
    });
  });

  const test8Cases = [
    { model: "", year: 2006 },
    { model: "Corolla", year: "" },
    { model: "", year: "" },
  ];

  test8Cases.forEach(({ model, year }) => {
    it(`gives error response when one or more values are missing`, async () => {
      const response = await request(expressApp)
        .post("/api/car-value")
        .send({ model, year });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "One or more values are missing",
      });
    });
  });

  it("gives error response when year is not written with digits", async () => {
    const response = await request(expressApp)
      .post("/api/car-value")
      .send({ model: "Corolla", year: "twenty twenty" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Year not recognised. Please use a valid year written in digits",
    });
  });
});
