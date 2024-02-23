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

const validateNameCreate = (alreadyExists) =>
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nombre invalido')
    .custom(async value => { if (await alreadyExists(value)) throw new Error('El nombre ya esta en uso') })

const validateNameUpdate = (alreadyExists) =>
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nombre invalido')
    .custom(async (value, { req }) => { if (await alreadyExists(value, req.params.id)) throw new Error('El nombre ya esta en uso') })

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
    .optional()
    .trim()
    .notEmpty()
    .withMessage(`El campo ${name} no puede estar vacio`)

module.exports = {
  validateParamId,
  validateNameCreate,
  validateNameUpdate,
  validateParamIdFunction,
  validatePositiveNumber,
  validateRequiredString,
  validateOptionalNotEmptyString,
  validateOnlyPositiveNumber,
  validateRequiredStringWithLength
}