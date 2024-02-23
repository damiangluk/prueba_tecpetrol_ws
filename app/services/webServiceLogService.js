const { create } = require("../repositories/webServiceLogRepository");
const COMPONENT = "integration.tecpetrol"

const createCompleteLog = async (log) => {
  const request = JSON.stringify(log.request);
  const response = JSON.stringify(log.response);

  const newLog = {
    metodo: log.methodName,
    componente: COMPONENT,
    url: log.url,
    request_fecha: new Date(),
    request_body: request,
    response_fecha: new Date(),
    response_body: response
  };

  return await create(newLog)
}

module.exports = { createCompleteLog }