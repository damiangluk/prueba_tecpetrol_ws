const { update } = require("../controllers/certificationController");
const processUrl = require("../middlewares/processUrl");
const { validateUpdate } = require("../validations/certificationValidations");

module.exports = app => {
  var router = require("express").Router();

  router.get("/init", (req, res) => { res.send('WS initialized!') });

  router.post("/update", validateUpdate, processUrl, update);

  app.use('/certification', router);
};