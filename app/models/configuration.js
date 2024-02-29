module.exports = (sequelize, DataTypes) => {
  const Configuration = sequelize.define("parametros_de_configuracion", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'parametros_de_configuracion',
    timestamps: false,
  });

  return Configuration;
};