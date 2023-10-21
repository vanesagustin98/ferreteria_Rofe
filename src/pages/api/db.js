require("dotenv").config();
const { Sequelize } = require("sequelize");
const UsersModel = require("../../models/users");
const ProductsModel = require("../../models/Products");
const DetailSaleModel = require("../../models/detailSale");
const SaleModel = require("../../models/sale");
const SuppliersModel = require("../../models/Suppliers");
const TagModel = require("../../models/Tag");
const ReviewModel = require("../../models/Review");

const SaleMasterModel = require("../../models/saleMaster");
const SaleDetailsModel = require("../../models/saleDetails");
const SalePaymentsModel = require("../../models/salePayments");

//IMPORTANTE!!!!!
// const { faTruckMedical } = require('@fortawesome/free-solid-svg-icons');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  dialectModule: require("pg"),
  force: false,
  operatorAliases: false,
  logging: false,
  native: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.sequelize = sequelize;

db.Users = UsersModel(sequelize);
db.Products = ProductsModel(sequelize);
db.DetailSale = DetailSaleModel(sequelize);
db.Sale = SaleModel(sequelize);
db.Suppliers = SuppliersModel(sequelize);
db.Tag = TagModel(sequelize);
db.Review = ReviewModel(sequelize);

db.SaleMaster = SaleMasterModel(sequelize);
db.SaleDetails = SaleDetailsModel(sequelize);
db.SalePayments = SalePaymentsModel(sequelize);

const {
  Users,
  Products,
  DetailSale,
  Sale,
  Suppliers,
  Tag,
  Review,
  SaleMaster,
  SaleDetails,
  SalePayments,
} = db.sequelize.models;

Users.belongsToMany(Products, { through: "user_product", timestamps: false });
Products.belongsToMany(Users, { through: "user_product", timestamps: false });

Products.belongsTo(Suppliers, {
  as: "supplier",
  foreignKey: "SupplierId",
  allowNull: true,
});

Products.belongsToMany(DetailSale, {
  through: "product_detailSale",
  timestamps: false,
});
DetailSale.belongsToMany(Products, {
  through: "product_detailSale",
  timestamps: false,
});
SaleMaster.hasMany(SaleDetails, { foreignKey: "sale_id" });
SaleMaster.hasMany(SalePayments, { foreignKey: "sale_id" });

SaleDetails.belongsTo(SaleMaster, { foreignKey: "sale_id" });
SalePayments.belongsTo(SaleMaster, { foreignKey: "sale_id" });
Products.belongsToMany(Tag, {
  through: "ProductTag",
  foreignKey: "productId",
});
Tag.belongsToMany(Products, {
  through: "ProductTag",
  foreignKey: "tagId",
});

Sale.hasMany(DetailSale, { foreignKey: "saleId" });
DetailSale.belongsTo(Sale, { foreignKey: "saleId" });

Review.belongsTo(Users, { foreignKey: "idUser" });
Users.hasOne(Review, { foreignKey: "idUser" });

Review.hasOne(Sale, { foreignKey: "idReview" });
Sale.belongsTo(Review, { foreignKey: "idReview" });

db.sequelize.sync();

module.exports = { db };
