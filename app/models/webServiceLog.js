module.exports = (sequelize, DataTypes) => {
  const WebServiceLog = sequelize.define("web_service_logs", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    metodo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    componente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    request_fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    request_body: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    response_fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    response_body: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'web_service_logs',
    timestamps: false,
  });

  return WebServiceLog;
};