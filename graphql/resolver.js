const Product = require('../models/productModel');

module.exports = {
  hello() {
    return { text: 'Hello World', views: 123 };
  },
  products: async function (args, req) {
    const totalProducts = await Product.find().countDocuments();
    const products = await Product.find().sort({ createdAt: -1 });

    return {
      products: products.map((p) => ({
        ...p._doc,
        _id: p._id.toString(),
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      })),
      totalProducts: totalProducts,
    };
  },
};
