const { db } = require("../../db")
db.sequelize.sync()
const Sale = db.Sale

module.exports = async () => {

  try {
    const sale = await Sale.findAll()

    return sale;

  } catch (error) {
    throw new Error({ error: error.message })
  }

}