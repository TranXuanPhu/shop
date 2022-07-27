const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/authController.js');
const userController = require('../app/controllers/user/userController.js');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refreshtoken', authController.refreshToken);

// Protect all routes after this middleware
//router.use(authController.isAuth);
router.post(
  '/addresses',
  authController.isAuth,
  userController.newAddressInUser
);

module.exports = router;
