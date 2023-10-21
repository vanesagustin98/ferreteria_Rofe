const {db} =require("../../db")
db.sequelize.sync()
const { Tag } = db;

module.exports = async(id) => {
  return await Tag.update(
    { isActive: false },
    {
      where: {
        id,
        isActive: true
      }
    }
  );
};
