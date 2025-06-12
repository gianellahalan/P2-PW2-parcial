const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

//Login para ADMIN 
const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Errores de validación");
    error.status = 400;
    error.errores = errors.array();
    return next(error);
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

//Validar datos de ADMIN
const validarAdmin = [
  body("email")
    .isEmail().withMessage("Debe ser un email válido")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 4 }).withMessage("La contraseña debe tener al menos 4 caracteres"),
];

//Registrar usuario
const register = async (req, res, next) => {
  const errors = validationResult(req);
  console.log("Errores de validación:", errors.array());
  console.log("📥 Se recibió POST /api/auth/register");

  if (!errors.isEmpty()){
    const error = new Error("Errores de validación");
    error.status = 400;
    error.errores = errors.array();
    return next(error);
  }

  try {
    const { nombre, email, password, rol } = req.body;

    const existente = await User.findOne({ email });
    if (existente) {
      return res.status(409).json({ mensaje: "El email ya está registrado" });
    }

    const nuevoUsuario = new User({ nombre, email, password, rol });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (err) {
    next(err);
  }
};

//Validar datos del usuario
const validarUsuario = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ max: 100 }).withMessage("Máximo 100 caracteres"),

  body("email")
    .isEmail().withMessage("Debe ser un email válido")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 4 }).withMessage("La contraseña debe tener al menos 4 caracteres"),

  body("rol")
  .notEmpty().withMessage("El rol es obligatorio")
  .isIn(["admin", "cliente"]).withMessage("El rol debe ser 'admin' o 'cliente'"),
];

module.exports = {
  login,
  register,
  validarAdmin,
  validarUsuario,
};