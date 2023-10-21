const { db } = require("../../db");
const Products = db.Products;
const Suppliers = db.Suppliers;
const Tag = db.Tag;

module.exports = async (data) => {
  try {
    // Busca el producto por su ID
    const product = await Products.findByPk(data.id);

    if (!product) {
      throw new Error('El producto no fue encontrado');
    }

    // Busca el proveedor existente por el nombre proporcionado
    const existingSupplier = await Suppliers.findOne({
      where: { name: data.supplierName },
    });

    if (!existingSupplier) {
      throw new Error('Proveedor no encontrado en la base de datos');
    }

    // Utiliza setSupplier para cambiar el proveedor del producto
    await product.setSupplier(existingSupplier);

    // Inicializa una variable para almacenar las etiquetas existentes
    let existingTags = [];

    // Verifica si se proporcionó el nombre de grupo
    if (data.group) {
      // Busca la etiqueta de grupo existente por nombre
      const existingGroupTag = await Tag.findOne({
        where: { name: data.group, type: 'group' },
      });

      // Si se encuentra la etiqueta de grupo, agrégala a la lista de etiquetas existentes
      if (existingGroupTag) {
        existingTags.push(existingGroupTag);
      }
    }

    // Verifica si se proporcionó el nombre de rubro
    if (data.rubro) {
      // Busca la etiqueta de rubro existente por nombre
      const existingRubroTag = await Tag.findOne({
        where: { name: data.rubro, type: 'rubro' },
      });

      // Si se encuentra la etiqueta de rubro, agrégala a la lista de etiquetas existentes
      if (existingRubroTag) {
        existingTags.push(existingRubroTag);
      }
    }

    // Asocia las etiquetas existentes al producto
    await product.setTags(existingTags);

    // Actualiza otros campos del producto con los datos proporcionados
    product.name = data.name;
    product.descripcion = data.descripcion;
    product.costoAnterior = data.costoAnterior;
    product.costoActual = data.costoActual;
    product.price = data.price;
    product.stock = data.stock;
    product.isActive = data.isActive;

    // Guarda los cambios en el producto
    await product.save();
    
    return product;
  } catch (error) {
    throw error;
  }
};

