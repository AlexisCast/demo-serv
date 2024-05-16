const Product = require('../models/productModel');
const {
  filterFunct,
  sortFunct,
  fieldsFunct,
  paginationFunct,
} = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.aliasLessThanHundred = async (req, res, next) => {
  // req.query.price = { $lte: 100 };   // normal object
  req.query.price = { lte: 100 };
  // req.query.available = true;
  next();
};

exports.getAllProducts = async (req, res) => {
  const {
    page = 1,
    limit = 15,
    fields = '-__v',
    sort = 'name',
    search = '',
    ...objQuery
  } = req.query;
  try {
    // 1) Filter
    let query = filterFunct(Product, objQuery);

    // 1.5) Search
    if (search !== '') {
      const regex = new RegExp(search, 'i');
      query = query.find({
        $or: [{ name: regex }],
        $and: [{ state: true }],
      });
    }

    // 2)Sort
    query = sortFunct(query, sort);

    // 3) Fields
    query = fieldsFunct(query, fields);

    // 4) Pagination
    let totalProtducts;
    if (page) {
      totalProtducts = await Product.countDocuments(query);
    }

    query = paginationFunct(Product, query, page, limit);

    // 5) Execution
    const products = await query;

    res.status(200).json({
      results: totalProtducts,
      shown: products.length,
      requestedAt: req.requestTime,
      data: {
        products: products,
      },
    });
  } catch (error) {
    res.status(404).json({
      msg: error.message ? error.message : 'Not able to get products',
      err: error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.status(200).json({
      data: {
        product: product,
      },
    });
  } catch (error) {
    res.status(404).json({
      msg: 'Product not found!',
      err: error,
    });
  }
};

exports.createProduct = catchAsync(async (req, res) => {
  // try {

  // const newProduct=new Product(req.body);
  // newProduct.save()

  const newProduct = await Product.create(req.body);

  res.status(201).json({
    data: {
      product: newProduct,
    },
  });
  // } catch (error) {
  //   console.warn(error);
  //   res.status(400).json({
  //     msg: 'Invalid data sent!',
  //     err: error,
  //   });
  // }
});

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      data: {
        product: updatedProduct,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: 'Not able to update!',
      err: error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id, {
      new: true,
    });

    res.status(200).json({
      data: {
        product: deletedProduct,
      },
    });
  } catch (error) {
    res.status(404).json({
      msg: 'Could not delete product!',
      err: error,
    });
  }
};
