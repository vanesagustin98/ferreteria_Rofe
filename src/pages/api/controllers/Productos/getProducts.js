const { db } = require("../../db");
const Products = db.Products;
const Tag = db.Tag;
const Suppliers = db.Suppliers;

module.exports = async () => {
  
const productsWithTags = await Products.findAll({
   include: [
    {
      model: Tag,

      through: {
        attributes: [], // Esto excluye completamente la tabla intermedia
      },
      attributes: ['name'], // Especifica los campos que deseas incluir de la etiqueta
    },
      {
          model: Suppliers,
          as:"supplier",
          attributes: ['name']
        }
  ],
});
//console.log(productsWithTags);
const reformattedProducts = productsWithTags.map((product) => {
  const group = product.Tags[0]?.name || ''; // El primer nombre en "grupo" o cadena vacía si no hay etiqueta
  const rubro = product.Tags[1]?.name || ''; // El segundo nombre en "rubro" o cadena vacía si no hay etiqueta

  // Crear un nuevo objeto con las propiedades reformateadas
  return {
    id: product.id,
    name: product.name,
    image:product.image,
    imageID:product.imageID,
    descripcion: product.descripcion,
    costoAnterior: product.costoAnterior,
    costoActual: product.costoActual,
    price: product.price,
    stock: product.stock,
    isActive: product.isActive,
    group,
    rubro,
   supplierName:product.supplier.name,
  };
});

return reformattedProducts
};
