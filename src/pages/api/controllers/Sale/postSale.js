const { db} = require("../../db");
const { Sale , SaleDetail,Products } = db;

module.exports = async (data) => {
 
    let newSale = await Sale.create({
        payMethod:data.payMethod,
        date:new Date() 
    })
    
    let precioTotal=0
    for (const productInfo of data.productosAVender) {
        
        const product= await Products.findByPk(productInfo.ProductoId);
        const precioFinal = productInfo.amount * productInfo.unitPrice;
        precioTotal += precioFinal
        newSale.precioTotal = precioTotal;
        await newSale.save();
   
        await SaleDetail.create({
            VentaId: newSale.id,
            ProductoId: productInfo.ProductoId,
            amount: productInfo.amount,
            unitPrice: productInfo.unitPrice,
            finalPrice: precioFinal,
            Product:product.name
        });
 
    }

   

}