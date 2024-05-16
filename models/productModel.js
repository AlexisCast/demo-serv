const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      default: 'other',
    },
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
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          //asuming it is being updated but needs (price & discountPrice to pass)
          if (this._update) {
            return val < this.getUpdate().$set.price;
          }
          //works only on post or when runValidators is false
          return val < this.price;
        },
        message: 'Discount price({VALUE}) should be below the regular price',
      },
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
    },
    rating: {
      stars: {
        type: Number,
        default: 0,
      },
      comments: {
        type: Number,
        default: 0,
      },
    },
    state: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: {
        values: ['toDelete', 'archived', 'exist'],
        message: 'status is either: toDelete, archived, exist',
      },
      default: 'exist',
    },
    updatedAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // select: false, // to permanently hide
    },
  },
  {
    strictQuery: 'throw',
    timestamps: true,
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
