const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homecontroller');

// GET home page
router.get('/', homeController.getHome);

module.exports = router;