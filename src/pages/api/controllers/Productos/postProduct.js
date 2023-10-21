const { db } = require("../../db");
const Products = db.Products;
const Tag = db.Tag;
const Suppliers = db.Suppliers;

module.exports = async (data) => {
  try {
    const {
      name,
      image,
      imageID,
      descripcion,
      costoAnterior,
      costoActual,
      price,
      stock,
      isActive,
      group,
      rubro,
      supplierName,
    } = data;
console.log(name);
    // Buscar las etiquetas de grupo y rubro por sus nombres
    const groupTag = await Tag.findOne({
      where: {
        name: group,
      },
    });

    const rubroTag = await Tag.findOne({
      where: {
        name: rubro,
      },
    });

    if (!groupTag || !rubroTag) {
      throw new Error("Una o ambas etiquetas no existen");
    }

    const supplier = await Suppliers.findOne({
      where: {
        name: supplierName,
      },
    });
     console.log(supplier, "aasdasdasdas");
    const newProduct = await Products.create({
      name,
       image,
       imageID,
      descripcion,
      costoAnterior,
      costoActual,
      price,
      stock,
      isActive,
      supplierName: supplier.name,
    });
console.log(newProduct);

await newProduct.addTag(groupTag); // Agregar una etiqueta de grupo al producto
await newProduct.addTag(rubroTag); // Agregar una etiqueta de rubro al producto
await newProduct.setSupplier(supplier); // Establecer el proveedor del producto

  } catch (error) {
    throw new Error(`Error al crear el producto: ${error.message}`);
  }
};
