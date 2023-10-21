const {db} =require("../../db")
db.sequelize.sync()
const Products = db.Products

module.exports = async(id) =>{

    await Products.update(
      {isActive:false},
      {where:{
        id:id,
        isActive:true
      }}
    )
}