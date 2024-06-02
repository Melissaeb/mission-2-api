const helloWorldModel = require("../models/helloWorldModel");

exports.getHelloWorld = (req, res) => {
  const message = helloWorldModel.helloWorld();
  res.status(200).send(message);
};
