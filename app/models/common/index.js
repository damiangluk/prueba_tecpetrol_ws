const Sequelize = require("sequelize");
const dbConfig = require("../../../config/config.json");

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// --------------------------- models ------------------------------

db.user = require("../user")(sequelize, Sequelize);
db.webServiceLog = require("../webServiceLog")(sequelize, Sequelize);
db.certificateRequest = require("../certificateRequest")(sequelize, Sequelize);
db.purchaseOrderDetailsMaterial = require("../purchaseOrderDetailsMaterial")(sequelize, Sequelize);
db.purchaseOrderMaterial = require("../purchaseOrderMaterial")(sequelize, Sequelize);

// --------------------------- asociations ------------------------------

db.certificateRequest.associate(db);
db.purchaseOrderDetailsMaterial.associate(db);
db.purchaseOrderMaterial.associate(db);

// --------------------------- sincronization ------------------------------

db.sequelize.sync().then(() => {
  console.log('Connection succesfully');
});

module.exports = db;