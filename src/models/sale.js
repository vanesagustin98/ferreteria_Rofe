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
        }
    }, { timestamps: false });

    return Sale;
}
