const db = require('../config/db');
const {
  PutObjectCommand
} = require('@aws-sdk/client-s3');

const s3 = require('../services/s3Service');

const getProducts = (req, res) => {

  const sql = `
    SELECT * FROM products
    ORDER BY id DESC
  `;

  db.query(sql, (error, results) => {

    if (error) {

      return res.status(500).json(error);
    }

    res.json(results);
  });
};

const createProduct = async (req, res) => {

  try {

    const { name, quantity, price } = req.body;

    let imageUrl = null;

    if(req.file){

      const fileName = `${Date.now()}-${req.file.originalname}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: fileName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype
        })
      );

      imageUrl = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`;
    }

    db.query(
      'INSERT INTO products (name, quantity, price, image_url) VALUES (?, ?, ?, ?)',
      [name, quantity, price, imageUrl],
      (err, result) => {

        if(err){

          return res.status(500).json(err);
        }

        res.json({
          message:'Product created'
        });
      }
    );

  } catch(error){

    console.error(error);

    res.status(500).json(error);
  }
};
const deleteProduct = (req, res) => {

  const { id } = req.params;

  db.query(

    'DELETE FROM products WHERE id=?',

    [id],

    (err, result) => {

      if (err) {

        return res.status(500).json(err);
      }

      res.json({
        message: 'Product deleted'
      });
    }
  );
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct
};