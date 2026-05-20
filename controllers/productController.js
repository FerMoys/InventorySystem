const db = require('../config/db');

exports.getProducts = (req, res) => {

    const sql = `
        SELECT * FROM products
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

exports.createProduct = (req, res) => {

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
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Product created'
            });
        }
    );
};