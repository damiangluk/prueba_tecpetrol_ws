const error = (message, replacements = []) => ({ message: message.replace(/\{\d\}/g, match => replacements[match[1]]) });

const messages = {
  NOT_FOUND_ENTITY: 'No se encontro resultado para la busqueda',
  NOT_FOUND_DELETE: 'No se encontro el registro a eliminar',
  USER_NOT_FOUND: 'El usuario o la contraseña ingresados no son correctos',
  PRODUCTS_NOT_FOUND: 'Uno de los productos no se encontro en la sucursal',
  INSUFFICIENT_STOCK: 'No hay stock suficiente',
  REFRESH_TOKEN_EXPIRED: 'El token de actualizacion expiro. Por favor realice un nuevo inicio de sesion.',
  REFRESH_TOKEN_DOESNT_EXIST: 'El token de actualizacion especificado no existe.',
  DONT_HAVE_PERMISSION: 'No tienes permiso para realizar esta accion.',
  COULD_NOT_DELETE_CATEGORY: 'No se puede eliminar la categoria porque tiene productos asociados'
};

module.exports = { error, ...messages };