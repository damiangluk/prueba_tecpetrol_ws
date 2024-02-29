const { validationOk } = require("../helpers/responseHelper");
const certificateRequest = require("../models/certificateRequest");
const { getStatus } = require("../models/enums/certificacionStates");
const { update } = require("../repositories/certificateRequestRepository");

const saveOrders = async (body, url) => {
  console.log('save ordeeeeer')
  return { aa:"hola"}
}

module.exports = { saveOrders }