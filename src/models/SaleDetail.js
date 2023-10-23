const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SaleDetail = sequelize.define("SaleDetail", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        unitPrice: {
            type: DataTypes.INTEGER
        },
        finalPrice: {
            type: DataTypes.INTEGER
        }, VentaId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Sales', 
                key: 'id', 
            },
        },
        ProductoId: {
            type: DataTypes.UUID, 
            allowNull: false,
            references: {
                model: 'Products', 
                key: 'id', 
            },
        },
        Product:{
            type: DataTypes.STRING,
        }
    }, { timestamps: false });

    return SaleDetail;
}
