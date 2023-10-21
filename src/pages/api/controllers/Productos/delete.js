const {db} =require("../../db")
db.sequelize.sync()
const Products = db.Products

module.exports = async(id) =>{

   await Products.destroy(
    {where:{
      id:id,
    }}
  )
  
}