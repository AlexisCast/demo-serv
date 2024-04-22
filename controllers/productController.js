const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      results: products.length,
      requestedAt: req.requestTime,
      data: {
        products: products,
      },
    });
  } catch (error) {
    res.status(404).json({
      msg: 'Not able to get products',
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
    });
  }
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
