const bcrypt = require('bcryptjs');

const db = require('../config/db');

const { generateToken } = require('../services/jwtService');

const login = (req, res) => {

  const { username, password } = req.body;

  const sql = `
    SELECT * FROM users
    WHERE username = ?
  `;

  db.query(sql, [username], async (error, results) => {

    if (error) {

      return res.status(500).json(error);
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

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  });
};

module.exports = {
  login
};