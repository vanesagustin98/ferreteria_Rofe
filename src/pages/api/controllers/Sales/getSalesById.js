const { db } = require("../../db");
const { SaleDetails } = db;


module.exports = async(id) => {
  try {
      const detailSale = await SaleDetails.findByPk(id)
      return detailSale
  } catch (error) {
        throw new Error(`Error al buscar el detailSale: ${error.message}`);
  }
}