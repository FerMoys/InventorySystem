const db = require('../config/db');

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

const createProduct = (req, res) => {

  const {
    name,
    quantity,
    price
  } = req.body;

  const sql = `
    INSERT INTO products
    (name, quantity, price)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [name, quantity, price],
    (error, results) => {

      if (error) {

        return res.status(500).json(error);
      }

      res.json({
        message: 'Product created'
      });
    }
  );
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