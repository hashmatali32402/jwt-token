const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

router.post('/register',AuthController.register);
router.post('/login',AuthController.login);
router.get('/users',UserController.getAllUsers);


module.exports = router