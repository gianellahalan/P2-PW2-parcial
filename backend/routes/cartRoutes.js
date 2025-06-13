const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

// Obtener el carrito del usuario autenticado
router.get('/', verificarToken, cartController.obtenerCarrito);

// Agregar un producto al carrito
router.post('/agregar', verificarToken, cartController.agregarProducto);

// Eliminar un producto del carrito
router.delete('/eliminar/:productId', verificarToken, cartController.eliminarProducto);

// Vaciar todo el carrito
router.delete('/vaciar', verificarToken, cartController.vaciarCarrito);

module.exports = router;
