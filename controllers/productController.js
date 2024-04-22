const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  const { fields = '-__v', sort = 'name', ...objQuery } = req.query;
  try {
    // 1) Filter
    let queryStr = JSON.stringify(objQuery);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //api/v1/products?state=true&price[gte]=40 with filtering gte gt lte lt

    // const products = await Product.find(objQuery);
    //{{url}}/api/v1/products?state=true   with no filtering gte gt lte lt

    let query = Product.find(JSON.parse(queryStr));

    // 2)Sort
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      query = query.sort(sortBy);
    }

    // 3) Fields
    if (fields) {
      const fieldsBy = fields.split(',').join(' ');
      query = query.select(fieldsBy);
    }

    // 4) Execute
    const products = await query;

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
