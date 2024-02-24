const { updateCertificate } = require("../services/certificationService");

exports.update = async (req, res) => {
  try {
    const data = await updateCertificate(req.body, req.url)
    return res.send(data);

  } catch (error) {
    res.status(500).send({ message: error.message || "Ocurrio un error al actualizar la solicitud de certificado." });
  }
};