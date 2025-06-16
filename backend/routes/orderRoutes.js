const express = require('express'); 
const router = express.Router();
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');
const {
  crearPedido,
  obtenerMisPedidos,
  cancelarPedido,  
  cambiarEstadoPedido,
  obtenerTodosLosPedidos
} = require('../controllers/orderController');

// Crear pedido (cliente)
router.post('/', verificarToken, crearPedido);

// Obtener pedidos del usuario autenticado
router.get('/', verificarToken, obtenerMisPedidos);

//Cancelar pedido
router.patch('/:id/cancelar', verificarToken, cancelarPedido);

// Obtener todos los pedidos (admin)
router.get('/admin', verificarToken, soloAdmin, obtenerTodosLosPedidos);

// Cambiar estado del pedido (admin)
router.patch('/estado/:id', verificarToken, soloAdmin, cambiarEstadoPedido);

module.exports = router;
