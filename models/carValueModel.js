// Finds value for each character (a=1, b=1, c=3 etc.)
const characterValue = (letter) => letter.toLowerCase().charCodeAt(0) - 96;

// Splits the model into separate characters and adds all characterValues, filtering out non-alphabetical characters

exports.calculateValue = (model, year) => {
  const modelValue = model.split("").reduce((sum, letter) => {
    const letterValue = characterValue(letter);
    return letterValue >= 1 && letterValue <= 26 ? sum + letterValue : sum;
  }, 0);

  return modelValue * 100 + year;
};
