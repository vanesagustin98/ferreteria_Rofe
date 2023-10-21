const { db } = require("../../db")
db.sequelize.sync()
const SalePayments = db.SalePayments
const SaleMaster = db.SaleMaster
const SaleDetails = db.SaleDetails

module.exports = async () => {

 try {
   const sales = await SaleMaster.findAll({
      include: [SaleDetails, SalePayments]
    });

        const formattedSales = sales.map((sale) => {
      return {
        id: sale.id,
        saleDate: sale.saleDate,
        totalAmount: sale.totalAmount,
        SaleDetails: sale.SaleDetails[0]?.id,
        method: sale.SalePayments[0]?.method || '', // Obtener el método de pago del primer elemento o cadena vacía si no existe
      };
    });
    return formattedSales;
 } catch (error) {
  throw new Error({error:error.message})
 }

}