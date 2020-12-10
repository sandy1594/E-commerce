const Sequelize = require("sequelize");

const db = require("../config/database");

const User = require("./User");

const AddToCart = db.define("cart", {
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
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

User.associate = (models) => {
  Users.hasMany(models.AddToCart);
};

db.sync({})
  .then(() => {
    console.log("Synced");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = AddToCart;
