const { body } = require('express-validator');
const { addResult } = require('../helpers/validateHelper')
const { validateRequiredString, validateRequiredStringWithLength, validateOptionalStringWithLength, validateOptionalDate, validateOptionalDecimal, validateRequiredNumber, validateRequiredDouble, validateOptionalNumber, validateOptionalDouble } = require('./genericValidations');
const { getUserByUsernameAndPassword } = require('../services/userService');
const { configurationHelper } = require('../helpers/configurationHelper');

const validateUniqueOrdersAndPositions = body('OrdenesDeCompra').custom((ordenesDeCompra) => {
  const duplicated = ordenesDeCompra.reduce((acc, order) => {
    if (acc[order.NotaDePedido]) acc[order.NotaDePedido]++;
    else acc[order.NotaDePedido] = 1;

    return acc;
  }, {});

  const duplicatedOrders = Object.keys(duplicated).filter(key => duplicated[key] > 1);

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
  body("OrdenesDeCompra")
    .notEmpty()
    .withMessage("Las ordenes de compra no estan en el formato correcto")
    .isArray({ min: 1 })
    .withMessage(`Error: La peticion debe contener al menos 1 orden`)
    .isArray({ max: configurationHelper.TecpetrolWebServiceOrdersMaxQuantity })
    .withMessage(`Error: La peticion excede la cantidad máxima de órdenes a procesar (cantidad máxima: ${configurationHelper.TecpetrolWebServiceOrdersMaxQuantity})`),
  validateRequiredStringWithLength('OrdenesDeCompra.*.NotaDePedido', 1, 10),
  validateOptionalStringWithLength('OrdenesDeCompra.*.TipoDeContrato', 0, 1),
  validateOptionalStringWithLength('OrdenesDeCompra.*.ClaseDeDocumento', 0, 4),
  validateOptionalStringWithLength('OrdenesDeCompra.*.StatusDeTratamiento', 0, 2),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Proveedor', 0, 10),
  validateOptionalDate("OrdenesDeCompra.*.FechaInPerValidez"),
  validateOptionalDate("OrdenesDeCompra.*.FechaFinDeVigencia"),
  validateOptionalDate("OrdenesDeCompra.*.FechaDeDocumento"),
  validateOptionalStringWithLength('OrdenesDeCompra.*.CondicionDePago', 0, 4),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Incoterm1', 0, 3),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Incoterm2', 0, 28),
  validateOptionalDecimal('OrdenesDeCompra.*.ValorPrevisto'),
  body("OrdenesDeCompra.*.Detalles")
    .notEmpty()
    .withMessage("Los detalles de una orden de compra no estan en el formato correcto")
    .isArray({ min: 1 })
    .withMessage(`Error: La orden de compra debe contener al menos 1 detalle`),
  validateRequiredNumber('OrdenesDeCompra.*.Detalles.*.Posicion'),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.MarcaDeBorrado', 0, 1),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.Material', 0, 40),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.TipoDeImputacion', 0, 1),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.TipoDePosicion', 0, 1),
  validateRequiredDouble('OrdenesDeCompra.*.Detalles.*.Cantidad'),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.TipoDePosicion', 0, 1),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.Unidad', 0, 3),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.Paquete', 0, 10),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.Subpaquete', 0, 10),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.INROW', 0, 10),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.EXTROW', 0, 10),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.TextoBreve', 0, 40),
  validateOptionalDate("OrdenesDeCompra.*.Detalles.*.FechaDeEntrega"),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.GrupoDeArticulo', 0, 9),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.Centro', 0, 4),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.Almacen', 0, 4),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.DescripcionAlmacen', 0, 16),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.ContratoMarco', 0, 10),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.ClaseDeValoracion', 0, 10),
  validateOptionalNumber('OrdenesDeCompra.*.Detalles.*.PlazoDeEntrega'),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.SuministroCompleto', 0, 1),
  validateOptionalDecimal('OrdenesDeCompra.*.Detalles.*.PrecioNeto'),
  validateOptionalNumber('OrdenesDeCompra.*.Detalles.*.CantidadBase'),
  validateOptionalDecimal('OrdenesDeCompra.*.Detalles.*.ValorNeto'),
  validateOptionalDecimal('OrdenesDeCompra.*.Detalles.*.ValorBruto'),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.Moneda', 0, 5),
  validateOptionalDouble('OrdenesDeCompra.*.Detalles.*.ToleranciaExcesoSuministro'),
  validateOptionalDouble('OrdenesDeCompra.*.Detalles.*.ToleranciaSuministroIncompleto'),
  validateOptionalNumber('OrdenesDeCompra.*.Detalles.*.NumeroActualDeImputacion'),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.CuentaMayor', 0, 10),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.Division', 0, 4),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.PEP', 0, 8),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.CentroDeCostos', 0, 10),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.OrdenDeCostos', 0, 12),
  validateOptionalStringWithLength('OrdenesDeCompra.*.Detalles.*.Grafo', 0, 12),
  validateOptionalNumber('OrdenesDeCompra.*.Detalles.*.Operacion'),
  body('OrdenesDeCompra.*.Detalles.*')
    .custom(async (detail) => {
      if (string.IsNullOrEmpty(d.Material)) {
        if (string.IsNullOrEmpty(oc.Proveedor)) throw new Error(`Error: Proveedor obligatorio (nota de pedido: ${oc.NotaDePedido})`);
        //if (oc.FechaInPerValidez == null) throw new Error(`Error: Fecha Inicio Periodo Validez obligatorio (nota de pedido: ${oc.NotaDePedido})`);
        if (oc.FechaFinDeVigencia == null) throw new Error(`Error: Fecha Fin Vigencia obligatorio (nota de pedido: ${oc.NotaDePedido})`);
        if (string.IsNullOrEmpty(d.Paquete)) throw new Error(`Error: Paquete obligatorio (nota de pedido/posición: ${oc.NotaDePedido}/${d.Posicion})`);
        if (string.IsNullOrEmpty(d.Subpaquete)) throw new Error(`Error: Subpaquete obligatorio (nota de pedido/posición: ${oc.NotaDePedido}/${d.Posicion})`);
        if (string.IsNullOrEmpty(d.INROW)) throw new Error(`Error: INROW obligatorio (nota de pedido/posición: ${oc.NotaDePedido}/${d.Posicion})`);
        if (string.IsNullOrEmpty(d.EXTROW)) throw new Error(`Error: EXTROW obligatorio (nota de pedido/posición: ${oc.NotaDePedido}/${d.Posicion})`);
      }
    }),
  body('User')
    .custom(async (userCredentials) => {
      const user = await getUserByUsernameAndPassword(userCredentials.Nickname, userCredentials.Password)
      if (!user) throw new Error('Error: Usuario o contraseña incorrectos')
      if (!user.activo) throw new Error('Error: El usuario está deshabilitado')
    }),
  validateUniqueOrdersAndPositions
])

module.exports = { validateSave }