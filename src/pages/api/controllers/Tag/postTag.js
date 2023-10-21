const {db} = require("../../db")
db.sequelize.sync()
const Tag = db.Tag

module.exports = async (data) =>{

  const newTag = Tag.create(data)

  return newTag
}