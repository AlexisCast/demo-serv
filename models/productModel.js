const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  description: {
    type: String,
    required: [true, 'A product must have a description'],
  },
  available: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
    default: '',
  },
  state: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
