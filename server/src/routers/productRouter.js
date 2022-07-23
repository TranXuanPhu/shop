const express = require('express');
const router = express.Router();
const multerHelper = require('../helpers/multer.js');
const productController = require('../app/controllers/productController.js');
//router.get('/', productController.getProducts);
router.post('/', multerHelper.cpUploadArray, productController.createProduct);

router.get('/:slug', productController.getProductBySlug);

module.exports = router;
