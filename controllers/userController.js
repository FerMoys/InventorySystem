const db = require('../config/db');

const getProfile = (req, res) => {

  const sql = `
    SELECT
      id,
      username
    FROM users
    WHERE id = ?
  `;

  db.query(
    sql,
    [req.user.id],
    (error, results) => {

      if (error) {

        return res.status(500).json(error);
      }

      res.json(results[0]);
    }
  );
};

module.exports = {
  getProfile
};