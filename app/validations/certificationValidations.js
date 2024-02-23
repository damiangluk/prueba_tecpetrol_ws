const { body } = require('express-validator');
const { addResult } = require('../helpers/validateHelper')
const { validateRequiredString, validateRequiredStringWithLength } = require('./genericValidations');
const { getUserByUsernameAndPassword } = require('../services/userService');
const { getStatus } = require('../models/enums/certificacionStates');
const { getByCertificateNumberAndOrder } = require('../repositories/certificateRequestRepository');

const validateUpdate = addResult([
  validateRequiredString('User.Nickname'),
  validateRequiredString('User.Password'),
  validateRequiredStringWithLength('NroCertificado', 1, 15),
  validateRequiredStringWithLength('OrdenDeCompra', 1, 10),
  validateRequiredStringWithLength('Estado', 2, 2),
  body('User')
    .custom(async (userCredentials) => {
      const user = await getUserByUsernameAndPassword(userCredentials.Nickname, userCredentials.Password)
      if (!user) throw new Error('Error: Usuario o contraseña incorrectos')
      if (!user.activo) throw new Error('Error: El usuario está deshabilitado')
    }),
  body('Estado')
    .custom(async (state) => {
      const status = await getStatus(state)
      if (!status) throw new Error(`Error: El estado de certificación ${state} no es válido`)
    }),
  body('NroCertificado')
    .custom(async (certificateNumber, { req }) => {

      const certificateRequest = await getByCertificateNumberAndOrder(certificateNumber, req.body.OrdenDeCompra);
      console.log('certificateRequest', certificateRequest)
    })
])

module.exports = { validateUpdate }