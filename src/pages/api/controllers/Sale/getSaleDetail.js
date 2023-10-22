const { db } = require("../../db");
const { Sale, SaleDetail, Products } = db;

module.exports = async (id) => {
  try {
    const detalles = await SaleDetail.findAll({
      where: { VentaId: id },
    });
    return detalles;
  } catch (error) {
    throw new Error(`Error al buscar el producto: ${error.message}`);
  }
};
