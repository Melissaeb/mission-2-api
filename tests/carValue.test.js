const request = require("supertest");
const expressApp = require("../app");

describe("POST /api/car-value", () => {
  const currentYear = new Date().getFullYear();

  it("Test 1: gives correct response for valid inputs", async () => {
    const response = await request(expressApp)
      .post("/api/car-value")
      .send({ model: "Corolla", year: 2015 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ value: 9615 });
  });

  it(`Test 2: gives correct response when model input included spaces, capitals, numbers and/or other symbols`, async () => {
    const response = await request(expressApp)
      .post("/api/car-value")
      .send({ model: "Mazda RX-8", year: 2006 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ value: 10706 });
  });

  it("Test 3: gives correct response when model input only includes numbers", async () => {
    const response = await request(expressApp)
      .post("/api/car-value")
      .send({ model: "216", year: 2023 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ value: 2023 });
  });

  const test4Cases = [
    { model: "Accord", year: 1885, expectedValue: 6285 },
    { model: "Accord", year: currentYear, expectedValue: 6424 },
  ];

  test4Cases.forEach(({ model, year, expectedValue }) => {
    it(`Test 4: gives correct response when year is just inside accepted range (1885 - ${currentYear}) (test: ${year})`, async () => {
      const response = await request(expressApp)
        .post("/api/car-value")
        .send({ model, year });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ value: expectedValue });
    });
  });

  const test5Cases = [
    { model: "Corolla", year: 1884 },
    { model: "Corolla", year: currentYear + 1 },
    { model: "Corolla", year: -2015 },
  ];

  test5Cases.forEach(({ model, year }) => {
    it(`Test 5: gives error response when year is outside accepted range (1885 - ${currentYear}) (test: ${year})`, async () => {
      const response = await request(expressApp)
        .post("/api/car-value")
        .send({ model, year });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: `Year is outside of the accepted range. Please input a year between 1885 and the current year`,
      });
    });
  });

  it("Test 6: gives error response when model does not include letters or numbers (@*()$)", async () => {
    const response = await request(expressApp)
      .post("/api/car-value")
      .send({ model: "@*()$", year: 2023 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Model not recognised. Please input a valid model",
    });
  });

  const test7Cases = [
    { model: "", year: 2006 },
    { model: "Corolla", year: "" },
  ];

  test7Cases.forEach(({ model, year }) => {
    it(`Test 7: gives error response when one or more values are missing (model: ${model}, year: ${year})`, async () => {
      const response = await request(expressApp)
        .post("/api/car-value")
        .send({ model, year });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "One or more values are missing",
      });
    });
  });

  const test8Cases = [
    { model: "Corolla", year: "twenty twenty" },
    { model: "Corolla", year: "2018.5" },
  ];

  test8Cases.forEach(({ model, year }) => {
    it(`Test 8: gives error response when year is not an integer(test: ${year})`, async () => {
      const response = await request(expressApp)
        .post("/api/car-value")
        .send({ model, year });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Year not recognised. Please use a valid year written in digits",
      });
    });
  });
});
