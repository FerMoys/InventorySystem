const express = require('express');

const router = express.Router();

const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage()
});

const {
  getProducts,
  createProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/', getProducts);

router.post(
  '/',
  upload.single('image'),
  createProduct
);

router.delete('/:id', deleteProduct);

module.exports = router;