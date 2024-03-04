const { body } = require('express-validator');
const { addResult } = require('../helpers/validateHelper')
const { validateRequiredString } = require('./genericValidations');
const { getUserByUsernameAndPassword } = require('../services/userService');
const { configurationHelper } = require('../helpers/configurationHelper');

const validateUniqueOrdersAndPositions = body('OrdenesDeCompra').custom((ordenesDeCompra) => {
  console.log('aaaaaaaaadvadvasa', ordenesDeCompra)
  const duplicated = ordenesDeCompra.reduce((acc, order) => {
    console.log('aaaaaaaaaa')
    if (acc[order.NotaDePedido]) acc[order.NotaDePedido]++;
    else acc[order.NotaDePedido] = 1;
    console.log('bbbbbbbb')

    return acc;
  }, {});
  console.log('dgvesvev', duplicated)

  const duplicatedOrders = Object.keys(duplicated).filter(key => duplicated[key] > 1);
  console.log('dgdgewf', duplicatedOrders)

  if (duplicatedOrders.length > 0) {
    throw new Error(`Error: Ordenes repetidas (notas de pedido: ${duplicatedOrders.join(',')})`);
  }

  ordenesDeCompra.forEach(order => {
    const duplicatedDetails = order.Detalles.reduce((acc, detail) => {
      if (acc[detail.Posicion]) {
        acc[detail.Posicion]++;
      } else {
        acc[detail.Posicion] = 1;
      }
      return acc;
    }, {});

    const duplicatedPositions = Object.keys(duplicatedDetails).filter(key => duplicatedDetails[key] > 1);

    if (duplicatedPositions.length > 0) {
      throw new Error(`Error: Detalles repetidos (posiciones: ${duplicatedPositions.join(',')}) en Orden ${order.NotaDePedido}`);
    }
  });

  return true;
});

const validateSave = addResult([
  validateRequiredString('User.Nickname'),
  validateRequiredString('User.Password'),
  body('User')
    .custom(async (userCredentials) => {
      const user = await getUserByUsernameAndPassword(userCredentials.Nickname, userCredentials.Password)
      if (!user) throw new Error('Error: Usuario o contraseña incorrectos')
      if (!user.activo) throw new Error('Error: El usuario está deshabilitado')
    }),
  body("OrdenesDeCompra")
    .notEmpty()
    .withMessage("Las ordenes de compra no estan en el formato correcto")
    .isArray({ min: 1 })
    .withMessage(`Error: La peticion debe contener al menos 1 orden`)
    .isArray({ max: configurationHelper.TecpetrolWebServiceOrdersMaxQuantity })
    .withMessage(`Error: La peticion excede la cantidad máxima de órdenes a procesar (cantidad máxima: ${configurationHelper.TecpetrolWebServiceOrdersMaxQuantity})`),
  validateUniqueOrdersAndPositions
])

module.exports = { validateSave }