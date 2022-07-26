const express = require('express');
const router = express.Router();
const multerHelper = require('../helpers/multer.js');
const productController = require('../app/controllers/productController.js');
const authController = require('../app/controllers/authController.js');
//router.get('/', productController.getProducts);
router.post(
  '/',
  authController.isAuth,
  authController.restrictTo('admin', 'manager'),
  multerHelper.cpUploadArray,
  productController.createProduct
);

router.get('/:slug', productController.getProductBySlug);

module.exports = router;
