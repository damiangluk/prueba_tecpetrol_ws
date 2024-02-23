const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  res.status(400).send({ message: result.array()[0]?.msg || "Some error occurred." })
}

const addResult = (array) => {
  array.push((req, res, next) => {
    validateResult(req, res, next)
  })
  return array;
}

module.exports = { addResult }