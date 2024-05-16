const express = require('express');
const multer = require('multer');

const productController = require('../controllers/productController');
const uploadsController = require('../controllers/uploadsController');
const authController = require('../controllers/authController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// router.param('id', productController.checkID);

router
  .route('/lessthan-100')
  .get(
    productController.aliasLessThanHundred,
    productController.getAllProducts,
  );

router
  .route('/')
  .get(productController.getAllProducts)
  .post(authController.protect, productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(authController.protect, productController.updateProduct)
  .delete(authController.protect, productController.deleteProduct);

router
  .route('/img/:id')
  .put(
    authController.protect,
    upload.single('file'),
    uploadsController.updateImageCloudinary,
  );

module.exports = router;
