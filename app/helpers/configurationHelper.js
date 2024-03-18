const { getConfigurationByName } = require("../services/configurationService");

const params = [
  { name: 'TecpetrolWebServiceOrdersMaxQuantity', id: "wirtrack.tecpetrol.webserviceordersmaxquantity", default: 50 }
]

let configurationHelper = {}

const getPropertyValue = async (property, defaultValue) => {
  const param = await getConfigurationByName(property);
  return param ? param.value : defaultValue;
}

const loadConfiguration = async () => {
  const promises = params.map(async item => ({
    key: item.name,
    value: await getPropertyValue(item.id, item.default)
  }));

  const results = await Promise.all(promises);

  results.forEach(item => configurationHelper[item.key] = item.value);
}

module.exports = { loadConfiguration, configurationHelper };