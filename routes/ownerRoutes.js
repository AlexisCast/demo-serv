const express = require('express');
const ownerController = require('../controllers/ownerController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, ownerController.getAllOwners)
  .post(authController.protect, ownerController.createOwner);

router
  .route('/:id')
  .get(authController.protect, ownerController.getOwner)
  .patch(authController.protect, ownerController.updateOwner)
  .delete(authController.protect, ownerController.deleteOwner);

module.exports = router;
