const db = require("../../config/db");

const getPosts = (req, res) => {
  const query = req.query.category ? "SELECT * FROM posts WHERE category=?" : "SELECT * FROM posts";
  const category = req.query.category;

  db.query(query, [category], (err, data) => {
    if (err) return res.send(err);
    
    return (
      res.status(200).json({
        error: false,
        data: data
      })
    )
  });
}

module.exports = {getPosts};