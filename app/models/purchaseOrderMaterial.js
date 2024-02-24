module.exports = (sequelize, DataTypes) => {
  const PurchaseOrderMaterial = sequelize.define("ordenes_de_compra_materiales",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nota_de_pedido: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'ordenes_de_compra_materiales',
      timestamps: false,
    });

  PurchaseOrderMaterial.associate = (models) => {
    PurchaseOrderMaterial.hasOne(models.purchaseOrderDetailsMaterial, {
      foreignKey: {
        name: 'orden_de_compra_materiales',
        allowNull: false,
      },
      as: 'purchaseOrderDetail'
    });

  };

  return PurchaseOrderMaterial;
};