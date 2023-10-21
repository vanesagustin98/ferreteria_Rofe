import { db } from "../../db";
const { Suppliers } = db;

const deleteSuppliers = async (id_suppliers) => {
  const supplier = await Suppliers.findByPk(id_suppliers);
  if (!supplier) throw new Error("unknow Supplier");
  await Suppliers.destroy({
    where: { id_suppliers },
  });
  return supplier;
};

export default deleteSuppliers;
