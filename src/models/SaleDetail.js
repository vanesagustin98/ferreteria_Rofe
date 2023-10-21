const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SaleDetail = sequelize.define("SaleDetail", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        amount:{
            type: DataTypes.NUMBER,
        },
        unitPrice:{
            type: DataTypes.NUMBER
        },
        finalPrice:{
            type: DataTypes.NUMBER
        }
    }, { timestamps: false });

    return SaleDetail;
}
