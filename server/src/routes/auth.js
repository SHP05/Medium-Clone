const express = require('express');
const router = express.Router();
const { Login, SignUp } = require('../controllers/auth');

router.post('/signup', SignUp);

router.post('/login', Login);

module.exports = router;
