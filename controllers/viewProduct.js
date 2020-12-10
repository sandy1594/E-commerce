const express = require("express");

const router = express.Router();

var exphbs = require("express-handlebars");

const Sequelize = require("sequelize");

const db = require("../config/database");

const Ecommerce = require("../model/Ecommerce");

var AddToCart = require("../model/AddToCart");

const jwt_decode = require("jwt-decode");

const User = require("../model/User");

router.get("/view/:id", async (req, res) => {
  try {
    let product = await Ecommerce.findOne({ where: { id: req.params.id } });
    // console.log(product);
    res.render("viewProduct", { product });
  } catch {
    res.sendStatus(404);
  }
});

router.post("/view/:id", async (req, res) => {
  try {
    let token = req.cookies.token;
    var { email, iat, exp } = jwt_decode(token);

    let userInfo = await User.findOne({
      where: {
        email: email,
      },
    });

    let toBeAdded = await Ecommerce.findOne({ where: { id: req.params.id } });
    // console.log(JSON.stringify(toBeAdded));
    let {
      name,
      price,
      category,
      sizes_available,
      brand,
      color,
      image,
      quantity,
    } = toBeAdded;
    let AlreadyInCart = await AddToCart.findOne({
      where: { name: toBeAdded.name },
    });
    if (AlreadyInCart) {
      AlreadyInCart.quantity = AlreadyInCart.quantity + 1;
      AlreadyInCart.price = AlreadyInCart.price * AlreadyInCart.quantity;
      // console.log(AlreadyInCart.quantity);
      AlreadyInCart.save();
      res.redirect("/cart");
    } else {
      let newCartItem = await AddToCart.create({
        name,
        price,
        category,
        sizes_available,
        brand,
        color,
        image,
        quantity,
      });
      await newCartItem.setUser(userInfo);
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
