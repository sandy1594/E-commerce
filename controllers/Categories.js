const express = require("express");

const router = express.Router();

const Ecommerce = require("../model/Ecommerce");

const AddToCart = require("../model/AddToCart");

const jwt_decode = require("jwt-decode");

const authenticate = require("../verifyToken");

const User = require("../model/User");

router.get("/category/:category", async (req, res) => {
  await Ecommerce.findAll({ where: { category: req.params.category } }).then(
    (catItems) => {
      res.render("category", { catItems });
    }
  );
});

module.exports = router;
