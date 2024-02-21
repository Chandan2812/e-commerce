// product.model.js
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  availability: {
    type: Boolean,
    default: true
  }
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
