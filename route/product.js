const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../model/product");
const checkAuth = require("../middleware/check_auth");
router.post("/addProduct", checkAuth, (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    productname: req.body.productname,
    description: req.body.description,
    rating: req.body.rating,
    image: req.body.image,
    quantity: req.body.quantity,
    instock: req.body.quantity < 1 ? false : true,
    createdDate: new Date(),
  });
  product
    .save()
    .then((result) => {
      res.status(200).json({
        new_product: result,
        status: "Added Sucessfully",
      });
    })
    .catch((err) => {
      error: err;
    });
});

router.get("/allproducts", async (req, res, next) => {
  try {
    const data = await Product.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
