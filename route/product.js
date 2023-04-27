const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../model/product");
const checkAuth = require("../middleware/check_auth");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dgvptxpla",
  api_key: "142616557286129",
  api_secret: "X1kv0nJkbjPtjqOMgm8UeeXxKpU",
});
router.post("/addProduct", checkAuth, (req, res, next) => {
  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log(result);
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      productname: req.body.productname,
      description: req.body.description,
      rating: req.body.rating,
      image: result.url,
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
