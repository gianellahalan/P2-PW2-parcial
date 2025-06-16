const User = require('../models/user');

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({}, 'nombre email rol');
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

module.exports = {
  obtenerTodosLosUsuarios,
};
