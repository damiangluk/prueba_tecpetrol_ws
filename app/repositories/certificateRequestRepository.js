const db = require("../models/common");
const { certificateRequest: CertificateRequest, purchaseOrderDetailsMaterial: PurchaseOrderDetailsMaterial, purchaseOrderMaterial: PurchaseOrderMaterial } = db;

const getByCertificateNumberAndOrder = async (certificateNumber, purchaseOrder) => {
console.log(certificateNumber)
  return await CertificateRequest.findOne({
    /*include: [{
      model: PurchaseOrderDetailsMaterial,
      include: [{
        model: PurchaseOrderMaterial,
        where: { nota_de_pedido: purchaseOrder },
        as: 'pruchaseOrder'
      }],
      as: 'detail'
    }],*/
    where: { numero_de_certificado: certificateNumber }
  });
};

module.exports = {
  getByCertificateNumberAndOrder
}