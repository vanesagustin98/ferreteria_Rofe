const {db} =require("../../db")
db.sequelize.sync()
const { Suppliers } = db;

module.exports = async(id_suppliers) => {
  return await Suppliers.update(
    { isActive: false },
    {
      where: {
        id_suppliers,
        isActive: true
      }
    }
  );
};
