const bcrypt = require('bcryptjs');

const db = require('../config/db');

const { generateToken } = require('../services/jwtService');

const login = (req, res) => {

  console.log('BODY:', req.body);

  const { username, password } = req.body;

  const sql = `
    SELECT * FROM users
    WHERE username = ?
  `;

  db.query(sql, [username], async (error, results) => {

    console.log('RESULTS:', results);

    if (error) {

      console.log(error);

      return res.status(500).json(error);
    }

    if (results.length === 0) {

      return res.status(401).json({
        message: 'User not found'
      });
    }

    const user = results[0];

    console.log('PASSWORD SENT:', password);

    console.log('HASH DB:', user.password);

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    console.log('VALID PASSWORD:', validPassword);

    if (!validPassword) {

      return res.status(401).json({
        message: 'Invalid credentials'
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
const register = async (req, res) => {

  const { username, password } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(

      'INSERT INTO users (username, password) VALUES (?, ?)',

      [username, hashedPassword],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);
        }

        res.status(201).json({
          message: 'User created'
        });
      }
    );

  } catch (error) {

    res.status(500).json(error);
  }
};

module.exports = {
  login,
  register
};