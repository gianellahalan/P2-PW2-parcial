const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  patchProduct,
  validarProduct
} = require('../controllers/productController');

const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

router.get('/', getAllProducts); // pública

router.post('/', verificarToken, soloAdmin, validarProduct, createProduct);
router.put('/:id', verificarToken, soloAdmin, updateProduct);
router.delete('/:id', verificarToken, soloAdmin, deleteProduct);
router.patch('/:id', verificarToken, soloAdmin, patchProduct);

module.exports = router;
