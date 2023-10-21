const { db } = require("../../db");
db.sequelize.sync(); 

const DetailSale = db.DetailSale;
const Sale = db.Sale;


module.exports = async (data) =>{
let totalAmout =0

for (const product of data.products) {
  totalAmout += product.quantity * product.unitPrice
}
//aaaaaaaaaaaaaaa
const newSale = Sale.create({
  saleDate: new Date(data.saleDate),
  totalAmout:totalAmout,
  paymentMethod:data.paymentMethod
})

for (const product of data.products) {
  await DetailSale.create({
   quantity: product.quantity,
    unitPrice: product.unitPrice,
    saleId: newSale.id,
    productId: product.productId,
  })
}

}