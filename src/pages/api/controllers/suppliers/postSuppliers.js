const { db } = require("../../db");
db.sequelize.sync();
const Suppliers = db.Suppliers;

const postSuppliers = async (data) => {
  console.log("creando Proveedor");
  const existSupplier = await Suppliers.findOne({
    where: {
      name: data.name,
    },
  });
  if (existSupplier) throw new Error(`Supplier ${data.name} already exists`);
  else {
    const newSupplier = await Suppliers.create(data);
    return newSupplier;
  }
};
export default postSuppliers;
