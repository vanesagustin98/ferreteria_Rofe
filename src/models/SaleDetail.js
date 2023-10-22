const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SaleDetail = sequelize.define("SaleDetail", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        amount:{
            type: DataTypes.INTEGER,
        },
        unitPrice:{
            type: DataTypes.INTEGER
        },
        finalPrice:{
            type: DataTypes.INTEGER
        },VentaId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Sales', // Nombre de la tabla de ventas
                key: 'id', // Campo de la tabla de ventas al que se relaciona
            },
        },
        ProductoId: {
            type: DataTypes.UUID, // Tipo de datos adecuado para el ID de producto
            allowNull: false,
            references: {
                model: 'Products', // Nombre de la tabla de productos
                key: 'id', // Campo de la tabla de productos al que se relaciona
            },
        },
    }, { timestamps: false });

    return SaleDetail;
}
