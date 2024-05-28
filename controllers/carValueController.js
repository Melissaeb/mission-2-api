const carValueModel = require("../models/carValueModel");

exports.calculateCarValue = (req, res) => {
  const { model, year } = req.body;
  const currentYear = new Date().getFullYear();
  const earliestYear = 1885;
  const regex = /^\W+$/;

  // Error handling:
  switch (true) {
    case model === "" || year === "":
      res.status(400).json({ error: "One or more values are missing" });
      break;
    case typeof year !== "number":
      res.status(400).json({
        error: "Year not recognised. Please use a valid year written in digits",
      });
      break;
    case regex.test(model):
      // Tests if the model does not contain numbers or letters
      res
        .status(400)
        .json({ error: "Model not recognised. Please input a valid model" });
      break;
    case year < earliestYear || year > currentYear:
      res.status(400).json({
        error:
          "Year is outside of the accepted range. Please input a year between 1885 and the current year",
      });
      break;
  }

  // Output for correct inputs:
  const carValue = carValueModel.calculateValue(model, year);
  res.json({ value: carValue });
};
