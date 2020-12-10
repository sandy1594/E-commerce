const Sequelize = require("sequelize");

const db = require("../config/database");

const User = require("./User");

const Order = db.define("order", {
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
    type: Sequelize.STRING,
  },
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
  },
});

User.associate = (models) => {
  Users.hasMany(models.Order);
};

db.sync({})
  .then(() => {
    console.log("Synced");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Order;
