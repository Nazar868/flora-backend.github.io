const { sequelize } = require("../config/sequelize");
const Bouquet = require("./bouquet");

const syncModels = async () => {
  // alter: true keeps the table in sync with the model during development
  await sequelize.sync({ alter: true });
};

module.exports = { sequelize, Bouquet, syncModels };
