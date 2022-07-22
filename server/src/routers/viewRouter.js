const express = require('express');
const router = express.Router();
const viewController = require('../app/controllers/viewController.js');

router.get('/', viewController.getOverView);

module.exports = router;
