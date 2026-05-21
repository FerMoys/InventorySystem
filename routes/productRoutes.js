const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

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
  upload.single('image'),
  createProduct
);
router.delete(
  '/:id',
  verifyToken, 
  deleteProduct
);
module.exports = router;