require("dotenv").config();
const { Sequelize } = require("sequelize");
const UsersModel = require("../../models/users");
const ProductsModel = require("../../models/Products");
const SuppliersModel = require("../../models/Suppliers");
const TagModel = require("../../models/Tag");
const ReviewModel = require("../../models/Review");
const SaleModel = require("../../models/sale")
const SaleDetailModel = require("../../models/SaleDetail")
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
db.Suppliers = SuppliersModel(sequelize);
db.Tag = TagModel(sequelize);
db.Review = ReviewModel(sequelize);
 db.Sale = SaleModel(sequelize)
 db.SaleDetail = SaleDetailModel(sequelize)

const {
  Users,
  Products,
  Suppliers,
  Tag,
  Review,
  SaleDetail,
  Sale
} = db.sequelize.models;

Sale.belongsToMany(Products, { through: SaleDetail });
Products.belongsToMany(Sale, { through: SaleDetail });

Users.belongsToMany(Products, { through: "user_product", timestamps: false });
Products.belongsToMany(Users, { through: "user_product", timestamps: false });

Products.belongsTo(Suppliers, {
  as: "supplier",
  foreignKey: "SupplierId",
  allowNull: true,
});
 
Products.belongsToMany(Tag, {
  through: "ProductTag",
  foreignKey: "productId",
});
Tag.belongsToMany(Products, {
  through: "ProductTag",
  foreignKey: "tagId",
});
 
Review.belongsTo(Users, { foreignKey: "idUser" });
Users.hasOne(Review, { foreignKey: "idUser" });

 
db.sequelize.sync();

module.exports = { db };
