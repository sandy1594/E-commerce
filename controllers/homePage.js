const express = require("express");

const router = express.Router();

const Ecommerce = require("../model/Ecommerce");

const jwt_decode = require("jwt-decode");

const User = require("../model/User");

const authenticate = require("../verifyToken");

router.get("/home", authenticate, (req, res) => {
  let token = req.cookies.token;
  var { email, iat, exp } = jwt_decode(token);

  User.findOne({ where: { email: email } })
    .then((userInfo) => {
      Ecommerce.findAll()
        .then((items) => {
          // console.log(prods.every((prod) => prod instanceof Ecommerce));
          // console.log("All Products:", JSON.stringify(prods, null, 2));
          // var data = JSON.stringify(prods);
          // console.log(data);
          res.render("homePage", { items, userInfo, layout: "authLayout" });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
