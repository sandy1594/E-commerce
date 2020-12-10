const Sequelize = require("sequelize");

const db = require("../config/database");

const AddToCart = require("./AddToCart");

const Order = require("./Order");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

AddToCart.belongsTo(User);
Order.belongsTo(User);

db.sync({})
  .then(() => {
    console.log("Synced");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = User;
