const { createCompleteLog } = require("../services/webServiceLogService");

const validationOk = async (requestObj, responseMessage, methodName, url, content = null) => {
  const responseObj =
  {
    status: true,
    validation: true,
    message: responseMessage,
    content
  };
  
  const log = {
    request: requestObj,
    response: responseObj,
    methodName,
    url
  }

  await createCompleteLog(log);

  return responseObj
}

const validationFailed = async (requestObj, responseMessage, methodName, url, content = null) => {
  const responseObj =
  {
    status: true,
    validation: false,
    message: responseMessage,
    content
  };

  const log = {
    request: requestObj,
    response: responseObj,
    methodName,
    url
  }

  await createCompleteLog(log);

  return JSON.stringify(responseObj)
}

module.exports = { validationOk, validationFailed }