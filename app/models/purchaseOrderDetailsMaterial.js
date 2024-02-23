module.exports = (sequelize, DataTypes) => {
  const PurchaseOrderDetailMaterial = sequelize.define("det_ordenes_de_compra_materiales",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      orden_de_compra_materiales: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false,
    });

  PurchaseOrderDetailMaterial.associate = (models) => {
    PurchaseOrderDetailMaterial.hasOne(models.certificateRequest, {
      foreignKey: {
        name: 'detalle',
        allowNull: false,
      },
      as: 'certificate'
    });

    PurchaseOrderDetailMaterial.belongsTo(models.purchaseOrderMaterial, {
      foreignKey: {
        name: 'orden_de_compra_materiales',
        allowNull: false,
      },
      as: 'pruchaseOrder'
    });
  };

  return PurchaseOrderDetailMaterial;
};