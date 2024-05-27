const express = require("express");
const app = express();
app.use(express.json());

app.post("/car-value", (req, res) => {
  const { model, year } = req.body;
  const currentYear = new Date().getFullYear();
  const earliestYear = 1885;
  const regex = /^\W+$/;

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
    default:
      const characterValue = (letter) =>
        letter.toLowerCase().charCodeAt(0) - 96;

      const modelValue = model.split("").reduce((sum, letter) => {
        const letterValue = characterValue(letter);
        return letterValue >= 1 && letterValue <= 26 ? sum + letterValue : sum;
      }, 0);

      const carValue = modelValue * 100 + year;

      res.json({ value: carValue });
  }
});

module.exports = app;
