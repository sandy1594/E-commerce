const express = require("express");

const router = express.Router();

const Order = require("../model/Order");

const jwt_decode = require("jwt-decode");

const authenticate = require("../verifyToken");

const User = require("../model/User");

router.get("/myorders", authenticate, async (req, res) => {
  try {
    let token = req.cookies.token;
    var { email, iat, exp } = jwt_decode(token);

    let userInfo = await User.findOne({
      where: {
        email: email,
      },
    });

    await Order.findAll({
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
      .then((myOrders) => {
        // let myyyOrdersss = JSON.stringify(myOrders);
        console.log(myOrders[0].uuid);
        res.render("myOrders", {
          myOrders,
          //   myyyOrdersss,
          layout: "authLayout",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
