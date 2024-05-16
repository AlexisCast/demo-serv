const Product = require('../models/productModel');

exports.aliasLessThanHundred = async (req, res, next) => {
  // req.query.price = { $lte: 100 };   // normal object
  req.query.price = { lte: 100 };
  req.query.available = true;
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
    let queryStr = JSON.stringify(objQuery);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //api/v1/products?state=true&price[gte]=40 with filtering gte gt lte lt

    // let query = Product.find(objQuery);  // normal object
    //{{url}}/api/v1/products?state=true   with no filtering gte gt lte lt

    let query = Product.find(JSON.parse(queryStr));

    if (search !== '') {
      const regex = new RegExp(search, 'i');
      query = query.find({
        $or: [{ name: regex }],
        $and: [{ state: true }],
      });
    }

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

    // 4) Pagination
    let totalProtducts;
    if (page) {
      totalProtducts = await Product.countDocuments(query);
    }

    const pageNum = page * 1;
    const limitNum = limit * 1;
    const skipNum = (pageNum - 1) * limitNum;
    query = query.skip(skipNum).limit(limitNum);

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
