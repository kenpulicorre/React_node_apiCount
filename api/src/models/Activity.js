const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.STRING,
        validate: { isIn: [["1", "2", "3", "4", "5"]] },
      },
      duration: {
        type: DataTypes.STRING,
        // validate: { isIn: [["1", "2", "3", "4", "5"]] },
      },
      season: {
        type: DataTypes.STRING,
        validate: { isIn: [["Verano", "Otoño", "Invierno", "Primavera"]] },
      },
    },
    { timestamps: false }
  );
};
