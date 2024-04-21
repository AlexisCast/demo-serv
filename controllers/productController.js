const fs = require("fs");

let products = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/products.json`)
);

exports.checkID = (req, res, next, val) => {
  const { id } = req.params;
  const product = products.find((item) => item.id == id);

  if (!product) {
    return res.status(404).json({
      msg: `${id} invalid id`,
    });
  }

  req.product = product;

  next()
}

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    results: products.length,
    requestedAt: req.requestTime,
    data: {
      products: products,
    },
  });
};

exports.getProduct = (req, res) => {
  res.status(200).json({
    data: {
      product: req.product
      ,
    },
  });
};

exports.createProduct = (req, res) => {
  const newId = products[products.length - 1].id + 1;
  const newProduct = {
    id: newId,
    ...req.body,
  };

  products = [...products, newProduct];

  fs.writeFile(
    `${__dirname}/dev-data/products.json`,
    JSON.stringify(products),
    (err) => {
      res.status(201).json({
        data: {
          product: { newProduct },
        },
      });
    }
  );
};

exports.updateProduct = (req, res) => {
  const product = req.product;

  const updatedProduct = {
    ...product,
    ...req.body,
  };

  const updatedProducts = products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );

  fs.writeFile(
    `${__dirname}/dev-data/products.json`,
    JSON.stringify(updatedProducts),
    (err) => {
      res.status(200).json({
        data: {
          product: updatedProduct
        },
      });
    }
  );
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find((item) => item.id == id);

  if (!product) {
    return res.status(404).json({
      msg: `${id} invalid id`,
    });
  }

  const updatedProducts = products.filter((product) => product.id != id);

  fs.writeFile(
    `${__dirname}/dev-data/products.json`,
    JSON.stringify(updatedProducts),
    (err) => {
      res.status(200).json({
        data: {
          product: { product },
        },
      });
    }
  );
};

