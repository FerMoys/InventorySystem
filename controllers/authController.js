const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO users (username, password)
        VALUES (?, ?)
    `;

    db.query(sql, [username, hashedPassword], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'User registered'
        });
    });
};

exports.login = (req, res) => {

    const { username, password } = req.body;

    const sql = `
        SELECT * FROM users
        WHERE username = ?
    `;

    db.query(sql, [username], async (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        const user = results[0];

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        res.json({
            token
        });
    });
};