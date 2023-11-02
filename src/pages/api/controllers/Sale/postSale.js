const { db} = require("../../db");
const { Sale , SaleDetail,Products } = db;

module.exports = async (data) => {
    let newSale = await Sale.create({
        payMethod:data.paymentMethod,
        date:new Date() 
    })
    
    let precioTotal=0
    for (const productInfo of data.productSummary) {
        
        const product= await Products.findByPk(productInfo.ID);
        const precioFinal = productInfo.Qty * productInfo.Price;
        precioTotal += precioFinal
        newSale.precioTotal = precioTotal;
        await newSale.save();
        console.log(product);
        await SaleDetail.create({
            VentaId: newSale.id,
            ProductoId: product.ID,
            amount: productInfo.Qty,
            unitPrice: product.price,
            finalPrice: precioFinal,
            Product:product.name
        });
        
   
    }

   return {}

}