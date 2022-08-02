const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/authController.js');
const userController = require('../app/controllers/user/userController.js');
const cartController = require('../app/controllers/user/cartController.js');
const orderController = require('../app/controllers/user/orderController.js');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refreshtoken', authController.refreshToken);

// Protect all routes after this middleware
//router.use(authController.isAuth);

router
  .route('/addresses')
  .post(authController.isAuth, userController.newAddressInUser)
  .patch(authController.isAuth, userController.updateAddress)
  .delete(authController.isAuth, userController.deleteAddress);

router
  .route('/cart')
  .get(authController.isAuth, cartController.getItemsInCart)
  .post(authController.isAuth, cartController.addItemToCart)
  .patch(authController.isAuth, cartController.updateItemsToCart)
  .delete(authController.isAuth, cartController.deleteItemToCart);

router
  .route('/orders')
  .get(authController.isAuth, orderController.getOrder)
  .post(authController.isAuth, orderController.createOder);

router
  .route('/orders/:id')
  .get(authController.isAuth, orderController.getOrderById);

module.exports = router;
