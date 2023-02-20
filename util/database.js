const Sequelize = require("sequelize");

const sequelize = new Sequelize("crud", "root", "qwe123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
