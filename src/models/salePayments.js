const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SalePayments = sequelize.define(
    "SalePayments",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      sale_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return SalePayments;
};
