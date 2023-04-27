const mongoose = require("mongoose");
productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productname: String,
  quantity: Number,
  description: String,
  rating: Number,
  image: String,
  instock: Boolean,
  createdDate: String,
});
module.exports = mongoose.model("product", productSchema);
