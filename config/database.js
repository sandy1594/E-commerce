const Sequelize = require("sequelize");

module.exports = new Sequelize("ecommerce", "naren713", "naren713", {
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});
