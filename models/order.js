const mongoose = require('mongoose'); 

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productos: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      cantidad: {
        type: Number
      }
    }
  ],
  estado: {
    type: String,
    enum: ['pendiente', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  total: Number,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
