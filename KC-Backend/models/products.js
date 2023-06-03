//Product Model

const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  ProductName: {
      type: String,
  },
  Category: {
    type: String,
  },
  Price: {
    type: Number,
  },
  Discount:  {
    type: Number,
  },
  Description: {
    type: String,
  },
  ProductImage: {
    type: String,
  },
  CreatedOn: {
    type: Date,
    default: Date.now()
  },
  inStock: {
    type: Number,
  },
  TopProduct: {
    type: Boolean,
    default: false
  },
  Ingredient: String
}, { versionKey: false });

module.exports = mongoose.model('Product', ProductSchema)