const db = require("../models");
const genericRepository = require("./genericRepository");
const { certificateRequest: CertificateRequest, purchaseOrderDetailsMaterial: PurchaseOrderDetailsMaterial, purchaseOrderMaterial: PurchaseOrderMaterial } = db;
const { updateGeneric } = genericRepository(CertificateRequest, db)

const getByCertificateNumberAndOrder = async (certificateNumber, purchaseOrder) => {
  return await CertificateRequest.findOne({
    include: [{
      model: PurchaseOrderDetailsMaterial,
      include: [{
        model: PurchaseOrderMaterial,
        where: { nota_de_pedido: purchaseOrder },
        as: 'pruchaseOrder',
      }],
      as: 'detail',
      required: true
    }],
    where: { numero_de_certificado: certificateNumber }
  });
};

module.exports = {
  getByCertificateNumberAndOrder,
  update: updateGeneric
}