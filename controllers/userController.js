const db = require('../config/db');

const getProfile = (req, res) => {

  const userId = req.user.id;

  db.query(
    'SELECT id, username, email, role FROM users WHERE id = ?',
    [userId],
    (err, results) => {

      if (err) {

        return res.status(500).json(err);
      }

      if (results.length === 0) {

        return res.status(404).json({
          message: 'User not found'
        });
      }

      res.json(results[0]);
    }
  );
};

module.exports = {
  getProfile
};