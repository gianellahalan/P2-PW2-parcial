const mongoose = require('mongoose'); 

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productos: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      }
    }
  ],
  estado: {
    type: String,
    enum: ['pendiente', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  total: {
    type: Number,
    required: true
  }
}, { timestamps: true }); // Esto agrega createdAt y updatedAt automáticamente

module.exports = mongoose.model('Order', orderSchema);

