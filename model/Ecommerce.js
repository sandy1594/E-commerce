const Sequelize = require("sequelize");

const db = require("../config/database");

const Ecommerce = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  category: {
    type: Sequelize.STRING,
  },
  sizes_available: {
    type: Sequelize.STRING,
  },
  brand: {
    type: Sequelize.STRING,
  },
  color: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
});

db.sync({})
  .then(() => {
    console.log("Synced");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Ecommerce;
