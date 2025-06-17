const { body, validationResult } = require("express-validator");
const Product = require('../models/product');

//Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Product.findById(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

//Crear un nuevo producto
const createProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Errores de validación");
    error.status = 400;
    error.errores = errors.array();
    return next(error); 
  }

  try {
    const nuevoProduct = new Product(req.body);
    const productoGuardado = await nuevoProduct.save();
    res.status(201).json(productoGuardado);
  } catch (err) {
    next(err);
  }
};


//Validar datos del producto
const validarProduct = [ 
  body("nombre") 
    .trim() 
    .notEmpty().withMessage("El nombre es requerido") 
    .isLength({ max: 100 }).withMessage("Máximo 100 caracteres"), 
 
  body("descripcion") 
    .trim()  
    .isLength({ max: 500 }).withMessage("Máximo 500 caracteres"),

  body("precio") 
    .isFloat({ gt: 0 }).withMessage("El precio debe ser mayor a 0") 
    .toFloat(), 
 
  body("stock") 
    .isInt({ min: 0 }).withMessage("El stock no puede ser negativo") 
    .toInt(), 
];

//Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

//Actualizar un producto - PUT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, nuevosDatos, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

//Actualizar un producto - PATCH
const patchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const camposActualizados = req.body;

    const productoModificado = await Product.findByIdAndUpdate(
      id,
      { $set: camposActualizados },
      { new: true, runValidators: true }
    );

    if (!productoModificado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(productoModificado);
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar el producto' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  patchProduct,
  validarProduct,
};