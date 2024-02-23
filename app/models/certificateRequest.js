module.exports = (sequelize, DataTypes) => {
  const CertificateRequest = sequelize.define("solicitudes_de_certificado", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    numero_de_solicitud: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_de_certificado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    detalle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_de_certificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comentarios: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
    {
      timestamps: false,
    });

  CertificateRequest.associate = (models) => {
    CertificateRequest.belongsTo(models.purchaseOrderDetailsMaterial, {
      foreignKey: {
        name: 'detalle',
        allowNull: false,
      },
      as: 'detail'
    });
  };

  return CertificateRequest;
};