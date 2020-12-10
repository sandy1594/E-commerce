const express = require("express");

const router = express.Router();

const User = require("../model/User");

const Order = require("../model/Order");

const AddToCart = require("../model/AddToCart");

const jwt_decode = require("jwt-decode");

router.post("/placeorder", async (req, res) => {
  try {
    let token = req.cookies.token;
    var { email, iat, exp } = jwt_decode(token);

    let userInfo = await User.findOne({
      where: {
        email: email,
      },
    });

    await AddToCart.findAll()
      .then((cartItems) => {
        var toBeOrdered = cartItems.map((cartItems) => {
          var orderItems = cartItems.toJSON();
          orderItems["userId"] = userInfo.id;
          return orderItems;
        });
        return Order.bulkCreate(toBeOrdered);
      })
      .then((toBeOrdered) => {
        // console.log(toBeOrdered);
      });
    AddToCart.destroy({ truncate: true });
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
