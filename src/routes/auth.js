const express = require('express');
const loginController = require('../controllers/auth/login');

// create a router instance
const router = express.Router();

// login route
router.post('/auth/login', loginController);

module.exports = router