const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    const Suppliers = sequelize.define('Suppliers', {
        id_suppliers: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        cellphone: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        name_company: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        direction: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    // Deshabilitamos timestamps (created_at y updated_at)
    { timestamps: false });
    
    return Suppliers;
    } 
 
  
