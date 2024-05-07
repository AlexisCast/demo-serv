const express = require('express');

const authController = require('../controllers/authController');
const ownerController = require('../controllers/ownerController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, ownerController.getAllOwners)
  .post(authController.protect, ownerController.createOwner);

router
  .route('/:id')
  .get(authController.protect, ownerController.getOwner)
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    ownerController.updateOwner,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    ownerController.deleteOwner,
  );

module.exports = router;
