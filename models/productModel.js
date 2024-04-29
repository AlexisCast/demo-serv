const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
    },
    slugName: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    description: {
      type: String,
      required: [true, 'A product must have a description'],
      trim: true,
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
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // to permanently hide
    },
  },
  {
    strictQuery: 'throw',
  },
);

//Document midddleware: runs before .save() and .create()
productSchema.pre('save', function (next) {
  this.slugName = slugify(this.name, { lower: true });
  next();
});

// productSchema.pre('save', (next) => {
//   console.log('will save document...');
//   next();
// });

// productSchema.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
