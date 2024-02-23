const { updateCertificate } = require("../services/certificationService");

exports.update = async (req, res) => {
  //const id = req.params.id;
  try {

    const data = await updateCertificate(req.body, req.url)

    //if (!data.message) {
      return res.send(data);
    //}

    //res.status(400).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocurrio un error al actualizar la categoria."
    });
  }
};