const express = require("express");

const router = express.Router();

const Ecommerce = require("../model/Ecommerce");

router.get("/", (req, res) => {
  Ecommerce.findAll()
    .then((items) => {
      // console.log(prods.every((prod) => prod instanceof Ecommerce));
      // console.log("All Products:", JSON.stringify(prods, null, 2));
      // var data = JSON.stringify(prods);
      // console.log(data);
      res.render("homePage", { items });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
