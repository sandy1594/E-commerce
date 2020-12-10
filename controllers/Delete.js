const express = require("express");

const router = express.Router();

var exphbs = require("express-handlebars");

const Sequelize = require("sequelize");

const db = require("../config/database");

const Ecommerce = require("../model/Ecommerce");

const AddToCart = require("../model/AddToCart");

router.delete("/delete/:id", async (req, res) => {
  try {
    await AddToCart.destroy({ where: { id: req.params.id } });
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
