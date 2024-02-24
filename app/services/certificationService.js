const { validationOk } = require("../helpers/responseHelper");
const certificateRequest = require("../models/certificateRequest");
const { getStatus } = require("../models/enums/certificacionStates");
const { update } = require("../repositories/certificateRequestRepository");

const updateCertificate = async (body, url) => {
  const methodName = 'UpdateCertificate'

  update(body.certificateRequest.id, {
    estado: getStatus(body.Estado),
    comentarios: body.Comentarios
  })

  return await validationOk(body, `Certificado ${body.NroCertificado} actualizado con éxito`, methodName, url)
}

module.exports = { updateCertificate }