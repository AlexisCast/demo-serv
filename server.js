require('dotenv').config();
const mongoose = require('mongoose');

const { dbConnection } = require('./database/config');

dbConnection();

const app = require('./app');

const port = process.env.PORT || 3000;

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

const testProduct = new Product({
  name: 'this is a name2',
  price: 123,
  // description: 'this is a desc',
});

testProduct
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.warn('ERR: ', err);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
