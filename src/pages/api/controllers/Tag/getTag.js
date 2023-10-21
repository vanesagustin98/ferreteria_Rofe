const { db } = require("../../db")
db.sequelize.sync()
const Tag = db.Tag

module.exports = async () => {

  try {
    const tag = await Tag.findAll()

    return tag;

  } catch (error) {
    throw new Error({ error: error.message })
  }

}