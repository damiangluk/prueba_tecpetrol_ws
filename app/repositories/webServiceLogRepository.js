const db = require("../models");
const genericRepository = require("./genericRepository")
const { webServiceLog: WebServiceLog } = db;
const { createGeneric } = genericRepository(WebServiceLog, db);

module.exports = {
  create: createGeneric
}