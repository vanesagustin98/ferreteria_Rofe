import { db } from "../../db";
const { Suppliers } = db;

const putSuppliers = async (data) => {
  const supplier = await Suppliers.update(data, {
    where: { id: data.id },
  });
  if (!supplier[0]) return supplier;

  const updateSupplier = await Suppliers.findByPk(data.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  if (!updateSupplier) throw new Error("Cannot update supplier record");
  return updateSupplier;
};
export default putSuppliers;
