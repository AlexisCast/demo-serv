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
      err: error,
    });
  }
};

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
    res.status(400).json({
      msg: 'Not able to update!',
      err: error,
    });
  }
};

exports.deleteProduct = (req, res) => {
  res.status(200).json({
    data: {
      // product: { product },
    },
  });
};
