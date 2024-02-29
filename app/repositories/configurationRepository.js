const { configuration: Configuration } = require("../models");

const getByName = async (name) => {
  return await Configuration.findOne({
    where: { nombre: name }
  });
};

module.exports = {
  getByName,
}