const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getUserProfile } = require('../controller/user');

router.get('/profile', protect, getUserProfile);

module.exports = router;
