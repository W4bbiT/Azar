//Product Model

const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  productName: {
      type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  discount:  {
    type: Number,
  },
  description: {
    type: String,
  },
  productImage: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  inStock: {
    type: Number,
  },
  featureProduct: {
    type: Boolean,
    default: false
  },
  ingredient: {
    type: String,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
  
}, { versionKey: false });

module.exports = mongoose.model('Product', ProductSchema)