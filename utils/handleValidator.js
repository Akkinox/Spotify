const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw(); // con esto hacemos la validacion de los campos
    return next(); // y con esto le decimos ahora ve al controller
  } catch (err) {
    res.status(403);
    res.send({ errors: err.array() });
  }
};

module.exports = validateResults;
