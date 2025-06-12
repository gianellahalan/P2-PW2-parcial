const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio']
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio']
  },
  stock: {
    type: Number,
    default: 0
  },
  imagen: {
    type: String
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
