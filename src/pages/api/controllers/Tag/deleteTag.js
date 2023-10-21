const {db} =require("../../db")
db.sequelize.sync()
const Tag = db.Tag

module.exports = async(id) =>{

   await Tag.destroy(
    {where:{
      id:id,
    }}
  )
  
}