const { db } = require("../../db");
const { Products, Suppliers, Tag } = db;

module.exports = async (productId) => {
  try {
    const product = await Products.findByPk(productId, {
      include: [
        {
          model: Suppliers,
          as: 'supplier',
          attributes: ['name'],
        },
        {
          model: Tag,
          through: { attributes: [] },
          attributes: ["name", "type"],
        },
      ],
    });
  const group = product.Tags[0]?.name || ''; 
  const rubro = product.Tags[1]?.name || ''; 
    if (!product) {
      throw new Error(`No se ha encontrado el producto con ID ${productId}`);
    }


    const formattedProduct = {
      name: product.name,
      descripcion: product.descripcion,
       image:product.image,
       imageID:product.imageID,
      costoAnterior: parseFloat(product.costoAnterior).toFixed(2),
      costoActual: parseFloat(product.costoActual).toFixed(2),
      price: parseFloat(product.price).toFixed(2),
      stock: product.stock,
      isActive: product.isActive,
group,
rubro,
      supplierName: product.supplier.name ,
    };

    return formattedProduct;
  } catch (error) {
    throw new Error(`Error al buscar el producto: ${error.message}`);
  }
};
