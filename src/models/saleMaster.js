const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SaleMaster = sequelize.define(
    "SaleMaster",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return SaleMaster;
};
