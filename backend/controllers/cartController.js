const Cart = require('../models/cart');
const Product = require('../models/product');

// Obtener el carrito del usuario
const obtenerCarrito = async (req, res) => {
  try {
    const carrito = await Cart.findOne({ user: req.user.id }).populate('productos.product');
    if (!carrito) {
      return res.json({ productos: [] });
    }
    res.json(carrito);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// Agregar producto al carrito
const agregarProducto = async (req, res) => {
  const { productId, cantidad } = req.body;

  try {
    let carrito = await Cart.findOne({ user: req.user.id });

    if (!carrito) {
      carrito = new Cart({ user: req.user.id, productos: [] });
    }

    const itemExistente = carrito.productos.find(
      item => item.product && item.product.toString() === productId
    );

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      carrito.productos.push({ product: productId, cantidad });
    }

      console.log("Carrito antes de guardar:", JSON.stringify(carrito, null, 2));

    await carrito.save();
    const carritoActualizado = await Cart.findOne({ user: req.user.id }).populate('productos.product');
    res.json(carritoActualizado);

  } catch (err) {
    console.error('Error al agregar producto al carrito:', err);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};


// Eliminar producto del carrito
const eliminarProducto = async (req, res) => {
  const { productId } = req.params;

  try {
    const carrito = await Cart.findOne({ user: req.user.id });
    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });

    carrito.productos = carrito.productos.filter(item =>
      item.product && item.product.toString() !== productId
    );

    await carrito.save();
    res.json(carrito);
  } catch (err) {
    console.error('Error al eliminar producto del carrito:', err);
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
};

// Vaciar carrito
const vaciarCarrito = async (req, res) => {
  try {
    const carrito = await Cart.findOne({ user: req.user.id });
    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });

    carrito.productos = [];
    await carrito.save();

    res.json({ mensaje: 'Carrito vaciado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al vaciar el carrito' });
  }
};

module.exports = {
  obtenerCarrito,
  agregarProducto,
  eliminarProducto,
  vaciarCarrito,
};
