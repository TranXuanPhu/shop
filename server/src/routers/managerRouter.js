const express = require('express');
const router = express.Router();
const multerHelper = require('../helpers/multer.js');
const productController = require('../app/controllers/productController.js');
const authController = require('../app/controllers/authController.js');
const orderController = require('../app/controllers/user/orderController.js');

// api cần quản lý
router.use(authController.isAuth);
router.use(authController.restrictTo('admin', 'manager'));

router.get('/orders', orderController.getAllOrders);

module.exports = router;
