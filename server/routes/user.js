const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.post('/signup', userController.usersign);
router.post('/login', userController.userlogin);

module.exports = router;