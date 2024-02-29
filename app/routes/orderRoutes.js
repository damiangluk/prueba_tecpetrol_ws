const { save } = require("../controllers/orderController");
const processUrl = require("../middlewares/processUrl");
const { validateSave } = require("../validations/orderValidations");

module.exports = app => {
  var router = require("express").Router();

  router.get("/init", (req, res) => { res.send('WS initialized!') });

  router.post("/save", validateSave, processUrl, save);

  app.use('/order', router);
};