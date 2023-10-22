const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Sale = sequelize.define("Sale", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        payMethod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, 
        }  ,  precioTotal: {
            type: DataTypes.FLOAT,  
          },
     
    }, { timestamps: true,
        timezone: '-03:00'
    });

    return Sale;
}
