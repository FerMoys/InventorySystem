const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');

const {
  getProducts,
  createProduct,
  deleteProduct
} = require('../controllers/productController');

router.get(
  '/',
  verifyToken,
  getProducts
);

router.post(
  '/',
  verifyToken,
  createProduct
);
router.delete(
  '/:id',
  verifyToken, 
  deleteProduct
);
module.exports = router;