const { param, body } = require('express-validator');
const { addResult } = require('../helpers/validateHelper');

const validateParamIdFunction = addResult([
  param('id')
    .trim()
    .notEmpty()
    .isInt()
    .withMessage('El id debe ser un numero')
])

const validateParamId =
  param('id')
    .trim()
    .notEmpty()
    .isInt()
    .withMessage('El id debe ser un numero')

const validatePositiveNumber = (name) =>
  body(name)
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage(`El campo ${name} debe ser un numero mayor o igual a 0`)

const validateOnlyPositiveNumber = (name) =>
  body(name)
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage(`El campo ${name} debe ser un numero mayor a 0`)

const validateRequiredString = (name) =>
  body(name)
    .trim()
    .notEmpty()
    .withMessage(`El campo ${name} es obligatorio`)

const validateRequiredStringWithLength = (name, min, max) =>
  body(name)
    .trim()
    .notEmpty()
    .withMessage(`El campo ${name} es obligatorio`)
    .isLength({ min, max })
    .withMessage(`El campo ${name} debe contener entre ${min} y ${max} caracteres`)

const validateOptionalNotEmptyString = (name) =>
  body(name)
    .optional({ values: 'null' })
    .trim()
    .notEmpty()
    .withMessage(`El campo ${name} no puede estar vacio`)

const validateOptionalStringWithLength = (name, min, max) =>
  body(name)
    .optional({ values: 'null' })
    .trim()
    .isLength({ min, max })
    .withMessage(`El campo ${name} debe contener entre ${min} y ${max} caracteres`)

const validateOptionalDate = (name) =>
  body(name)
    .optional({ values: 'null' })
    .custom((value) => {
      if (value === "" || value === null) {
        // Permitir cadena vacía o nula
        return true;
      } else {
        // Validar formato de fecha ISO 8601
        if (!value.match(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/)) {
          throw new Error(`El campo ${name} debe ser una fecha válida en formato ISO 8601`);
        }
        return true;
      }
    });

const validateOptionalDecimal = (name) =>
  body(name)
    .optional({ values: 'null' })
    .isDecimal()
    .withMessage(`El campo ${name} debe ser un número decimal`);
    
const validateRequiredNumber = (name) =>
  body(name)
    .notEmpty()
    .withMessage(`El campo ${name} es obligatorio`)
    .isNumeric()
    .withMessage(`El campo ${name} debe ser un numero`)

const validateOptionalNumber = (name) =>
  body(name)
    .optional({ values: 'null' })
    .isNumeric()
    .withMessage(`El campo ${name} debe ser un numero`)

const validateRequiredDouble = (name) =>
  body(name)
    .notEmpty()
    .withMessage(`El campo ${name} es obligatorio`)
    .isFloat()
    .withMessage(`El campo ${name} debe ser numerico`)

const validateOptionalDouble = (name) =>
  body(name)
    .optional({ values: 'null' })
    .isFloat()
    .withMessage(`El campo ${name} debe ser numerico`)

module.exports = {
  validateParamId,
  validateParamIdFunction,
  validatePositiveNumber,
  validateRequiredString,
  validateRequiredStringWithLength,
  validateRequiredNumber,
  validateRequiredDouble,
  validateOnlyPositiveNumber,
  validateOptionalNotEmptyString,
  validateOptionalStringWithLength,
  validateOptionalDate,
  validateOptionalDecimal,
  validateOptionalNumber,
  validateOptionalDouble
}