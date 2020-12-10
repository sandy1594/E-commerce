const express = require("express");

const router = express.Router();

const Ecommerce = require("../model/Ecommerce");

const AddToCart = require("../model/AddToCart");

const jwt_decode = require("jwt-decode");

const authenticate = require("../verifyToken");

const User = require("../model/User");

router.get("/cart", authenticate, async (req, res) => {
  try {
    let token = req.cookies.token;
    var { email, iat, exp } = jwt_decode(token);

    let userInfo = await User.findOne({
      where: {
        email: email,
      },
    });

    await AddToCart.findAll({
      include: [
        {
          all: true,
          nested: true,
          model: User,
          required: true,
          where: {
            id: userInfo.id,
          },
        },
      ],
    })
      .then((cartItems) => {
        // console.log(cartItems);
        let totalItems = Object.keys(cartItems).length;
        let cartArray = [];
        var total;
        for (i = 0; i < totalItems; i++) {
          cartArray.push(JSON.stringify(cartItems[i].price));
        }
        if (totalItems == 0) {
          total = 0;
        } else {
          let totalPrice = cartArray.map((p) => parseInt(p, 10));
          total = totalPrice.reduce((a, b) => a + b);
        }
        res.render("cart", {
          userInfo,
          cartItems,
          totalItems,
          total,
          layout: "authLayout",
        });
      })
      .catch((err) => {
        console.log(err);
        // res.render("cart", { layout: "authLayout" });
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
