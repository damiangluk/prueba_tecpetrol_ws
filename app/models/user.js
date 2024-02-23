module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("usuarios", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_de_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  });

  return User;
};