const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);

  // Error de validación de Mongoose
  if (err.name === "ValidationError") {
    return res.status(400).json({
      mensaje: "Datos inválidos",
      errores: err.errors ? Object.values(err.errors) : []
    });
  }

  // Error de duplicado
  if (err.code === 11000) {
    return res.status(409).json({
      mensaje: "El producto ya existe"
    });
  }

  // Otros errores
  if (err.errores) {
    return res.status(err.status || 400).json({
      mensaje: err.message || "Error en la solicitud",
      errores: err.errores
    });
  }

  // Errores no manejados
  res.status(err.status || 500).json({
    mensaje: err.message || "Error interno del servidor"
  });
};

module.exports = errorHandler;
