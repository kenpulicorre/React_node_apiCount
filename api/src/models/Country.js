const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isAlpha: true, len: [3] },
        primaryKey: true,
      },
      // id: {
      //   type: DataTypes.UUID,
      //   defaultValue: DataTypes.UUIDV4,
      //   allowNull: false,
      //   primaryKey: true,
      // },
      name: { type: DataTypes.STRING, allowNull: false },

      continent: { type: DataTypes.STRING, allowNull: false },
      capital: { type: DataTypes.STRING, allowNull: false },
      subregion: { type: DataTypes.STRING, allowNull: true },
      area: { type: DataTypes.FLOAT, allowNull: true },
      people: { type: DataTypes.STRING, allowNull: true },
      img_flag: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
  );
};
