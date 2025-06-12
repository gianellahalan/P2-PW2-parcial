const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
dotenv.config(); // Para usar variables de entorno desde .env
const cors = require("cors");
app.use(cors());

app.use(express.static('public'));

//Handlers
const responseHandler = require("./middlewares/responseHandler"); 
const errorHandler = require("./middlewares/errorHandler"); 
 
app.use(responseHandler);
app.use(errorHandler);

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Middlewares
app.use(express.json());

// Ruta para ver productos
app.use('/api/productos', productRoutes);

//Ruta de autenticación
app.use('/api/auth', authRoutes);

// Carrito
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/carrito', cartRoutes);

//Pedidos
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/pedidos', orderRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});