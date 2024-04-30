const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
      minlength: [
        4,
        'A product name must have more or equal then 4 characteres',
      ],
    },
    slugName: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [0.01, 'Must be at least 0.01, got {VALUE}'],
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
    status: {
      type: String,
      default: true,
      enum: {
        values: ['toDelete', 'archived', 'exist'],
        message: 'status is either: toDelete, archived, exist',
      },
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
