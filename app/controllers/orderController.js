const { updateCertificate } = require("../services/certificationService");
const { saveOrders } = require("../services/orderService ");

exports.save = async (req, res) => {
  try {
    const data = await saveOrders(req.body, req.url)
    return res.send(data);

  } catch (error) {
    res.status(500).send({ message: error.message || "Ocurrio un error al actualizar la solicitud de certificado." });
  }
};