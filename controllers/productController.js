const Product = require('../models/productModel');

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      msg: `Missing name or price`,
    });
  }

  next();
};

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    // results: products.length,
    requestedAt: req.requestTime,
    data: {
      // products: products,
    },
  });
};

exports.getProduct = (req, res) => {
  res.status(200).json({
    data: {
      // product: req.product,
    },
  });
};

exports.createProduct = async (req, res) => {
  try {
    // const newProduct=new Product(req.body);
    // newProduct.save()

    const newProduct = await Product.create(req.body);

    res.status(201).json({
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    console.warn(error);
    res.status(400).json({
      msg: 'Invalid data sent!',
    });
  }
};

exports.updateProduct = (req, res) => {
  res.status(200).json({
    data: {
      // product: updatedProduct,
    },
  });
};

exports.deleteProduct = (req, res) => {
  res.status(200).json({
    data: {
      // product: { product },
    },
  });
};
