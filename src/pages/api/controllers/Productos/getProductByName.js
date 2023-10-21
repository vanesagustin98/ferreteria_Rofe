//const { Sequelize } = require("sequelize");
const { db} = require("../../db");
const { Products, Tag,Suppliers } = db;
const {Op} = require("sequelize")

module.exports = async (name) => {
  const productWithTags = await Products.findAll({
    where: { name: { [Op.iLike] : `%${name}%` } },
    include: [
      {
        model: Tag,
        through: {
          attributes: [], 
        },
        attributes: ['name'], 
      },
      {
        model: Suppliers, // Incluye la relación con el proveedor
        as: 'supplier', // Asegura que esté utilizando el alias correcto
        attributes: ['name'], // Incluye solo el nombre del proveedor
      },
    ],
  });
  //console.log(productWithTags);
  if (!productWithTags) {

    return null;
  }

  const reformattedProducts = productWithTags.map((product) => {
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
