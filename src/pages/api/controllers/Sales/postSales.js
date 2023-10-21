const { db } = require("../../db");
db.sequelize.sync();

const SalePayments = db.SalePayments;
const SaleDetails = db.SaleDetails;
const SaleMaster = db.SaleMaster;
const Products = db.Products;

module.exports = async (data) => {
  let totalAmout = 0;
  data.productSummary.map((e) => (totalAmout = totalAmout + e.Subtotal));
  try {
    const newSale = await SaleMaster.create({
      saleDate: new Date(),
      totalAmount: totalAmout,
    });

    data.productSummary.map(async (e) => {
      await SaleDetails.create({
        sale_id: newSale.id,
        product_id: e.ID,
        quantity: e.Qty,
        subTotal: e.Subtotal,
      });
    });

    const newPayment = await SalePayments.create({
      sale_id: newSale.id,
      method: data.paymentMethod,
      amount: totalAmout,
    });

    data.productSummary.map(async (e) => {
      const getStock = await Products.findOne({
        where: {
          id: e.ID,
        },
      });
      let nuevoStock = parseInt(getStock.dataValues.stock) - parseInt(e.Qty);
      const [numFilasActualizadas] = await Products.update(
        { stock: nuevoStock },
        {
          where: { id: e.ID },
        }
      );
      console.log("numFilasActualizadas", numFilasActualizadas);
    });

    return newSale;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};
