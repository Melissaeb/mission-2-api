const carValueModel = require("../models/carValueModel");

exports.calculateCarValue = (req, res) => {
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
    default:
      const carValue = carValueModel.calculateValue(model, year);
      res.json({ value: carValue });
  }
};

// const express = require("express");
// const app = express();
// app.use(express.json());

// const getCarValue = (req, res) => {
//   const { model, year } = req.body;
//   const currentYear = new Date().getFullYear();
//   const earliestYear = 1885;
//   const regex = /^\W+$/;

//   switch (true) {
//     case model === "" || year === "":
//       res.status(400).json({ error: "One or more values are missing" });
//       break;
//     case typeof year !== "number":
//       res.status(400).json({
//         error: "Year not recognised. Please use a valid year written in digits",
//       });
//       break;
//     case regex.test(model):
//       // Tests if the model does not contain numbers or letters
//       res
//         .status(400)
//         .json({ error: "Model not recognised. Please input a valid model" });
//       break;
//     case year < earliestYear || year > currentYear:
//       res.status(400).json({
//         error:
//           "Year is outside of the accepted range. Please input a year between 1885 and the current year",
//       });
//       break;
//     default:
//       // Finds value for each character (a=1, b=1, c=3 etc.)
//       const characterValue = (letter) =>
//         letter.toLowerCase().charCodeAt(0) - 96;

//       // Splits the model into separate characters and adds all characterValues, filtering out non-alphabetical characters
//       const modelValue = model.split("").reduce((sum, letter) => {
//         const letterValue = characterValue(letter);
//         return letterValue >= 1 && letterValue <= 26 ? sum + letterValue : sum;
//       }, 0);

//       const carValue = modelValue * 100 + year;

//       res.json({ value: carValue });
//   }
// };

// module.exports = { getCarValue };
