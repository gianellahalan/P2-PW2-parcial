const Pedido = require('../models/order');
const Carrito = require('../models/cart');
const Product = require('../models/product'); 

// Crear pedido a partir del carrito del usuario logueado
const crearPedido = async (req, res) => {
  try {
    const userId = req.user._id;
    const carrito = await Carrito.findOne({ user: userId });

    if (!carrito || !Array.isArray(carrito.productos) || carrito.productos.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Calcular total
    let total = 0;
    for (const item of carrito.productos) {
      const producto = await Product.findById(item.product);
      if (producto) {
        total += producto.precio * item.cantidad;
      }
    }

    const nuevoPedido = new Pedido({
      user: userId,
      productos: carrito.productos,
      estado: 'pendiente',
      total
    });

    await nuevoPedido.save();

    // Vaciar carrito
    carrito.productos = [];
    await carrito.save();

    res.status(201).json({ mensaje: 'Pedido creado', pedido: nuevoPedido });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error al crear pedido' });
  }
};

// Obtener todos los pedidos del usuario logueado
const obtenerMisPedidos = async (req, res) => {
  try {
    const userId = req.user._id;
    const pedidos = await Pedido.find({ user: userId }).sort({ fecha: -1 });
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
};

// Obtener todos los pedidos (solo admin)
const obtenerTodosLosPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('user', 'email nombre').sort({ fecha: -1 });
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
};

// Cambiar estado de pedido (solo admin)
const cambiarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // Validar estados permitidos
    const estadosPermitidos = ['pendiente', 'entregado', 'cancelado'];
    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }

    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    pedido.estado = estado;
    await pedido.save();

    res.json({ mensaje: 'Estado actualizado', pedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cambiar estado del pedido' });
  }
};

module.exports = {
  crearPedido,
  obtenerMisPedidos,
  obtenerTodosLosPedidos,
  cambiarEstadoPedido,
};
