const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { register } = require('../controllers/authController');
const { validarAdmin } = require("../controllers/authController");
const { validarUsuario } = require("../controllers/authController");

router.post('/login', validarAdmin, login);
router.post('/register', validarUsuario, register);

module.exports = router;