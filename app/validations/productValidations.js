const { addResult } = require('../helpers/validateHelper')
const { body } = require('express-validator');
const { validateParamId, validateNameCreate, validatePositiveNumber, validateRequiredString, validateNameUpdate } = require('./genericValidations');
const { getProductByName } = require('../services/productService');

const validateCreate = addResult([
  validateNameCreate(getProductByName),
  validatePositiveNumber('stock', 'stock'),
  validatePositiveNumber('price', 'precio'),
  validateRequiredString('description'),
  body('categories')
    .notEmpty()
    .isArray({ min: 1 })
    .withMessage('Categorias invalidas')
])

const validateUpdate = addResult([
  validateParamId,
  validateNameUpdate(getProductByName),
  validatePositiveNumber('stock'),
  validatePositiveNumber('price'),
  validateRequiredString('description'),
  body('categories')
    .notEmpty()
    .isArray({ min: 1 })
    .withMessage('Categorias invalidas')
])

const validateDeletePicture = addResult([
  validateRequiredString('path'),
])

module.exports = { validateCreate, validateUpdate, validateDeletePicture }