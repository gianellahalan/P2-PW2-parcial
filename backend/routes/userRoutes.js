const express = require('express');
const router = express.Router();
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');
const { obtenerTodosLosUsuarios } = require('../controllers/userController');

router.get("/", verificarToken, soloAdmin, obtenerTodosLosUsuarios);

module.exports = router;