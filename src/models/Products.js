const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Definimos el modelo Products
  const Products = sequelize.define('Products', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
    },
    imageID:{
    type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    costoAnterior: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    costoActual: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, { timestamps: false });


  return Products;
};
