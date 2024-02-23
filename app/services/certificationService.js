const { validationOk } = require("../helpers/responseHelper")

const updateCertificate = async (body, url) => {
  const methodName = 'UpdateCertificate'

  return await validationOk(body, `Certificado ${body.NroCertificado} actualizado con éxito`, methodName, url)
}

module.exports = { updateCertificate }