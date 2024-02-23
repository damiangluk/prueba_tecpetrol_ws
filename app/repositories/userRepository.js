const db = require("../models/common");
const User = db.user;

const getByUsernameAndPassword = async (username, password) => {
  return await User.findOne({
    where: { 
      nombre_de_usuario: username,
      password: password,
      activo: 1
    }
  });
};

module.exports = {
  getByUsernameAndPassword
}