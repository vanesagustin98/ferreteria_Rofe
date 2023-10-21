const { db } = require("../../db");

const { Suppliers } = db;

const getSuppliers = async () => {
  return await Suppliers.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

export default getSuppliers;
