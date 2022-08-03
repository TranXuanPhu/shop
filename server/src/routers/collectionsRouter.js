const express = require('express');
const router = express.Router();
const viewController = require('../app/controllers/viewController.js');

router.get('/', viewController.getOverView);
router.get('/:style', viewController.getCollectionByType);

module.exports = router;
