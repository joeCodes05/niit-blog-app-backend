const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

db.connect((error) => {
  if (error)
    console.log(`Could not connect to database, due to: ${error.message}`);
  else {
    // create user tables
    db.query(`CREATE TABLE IF NOT EXISTS users (
      user_id INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL,
      profile_image VARCHAR(100) NULL,
      status TINYINT(5) DEFAULT 1,
      token VARCHAR(50) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) CHARSET utf8mb4 COLLATE = utf8mb_unicode_ci, ENGINE = InnoDB`);

    console.log("Connection successful");
  }
});

module.exports = db;
