const db = require('../../config/db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const table = "users"

// create user controller
const createUsers = async (req, res) => {
  const { fullName, email, password } = req.body;

  db.query(`SELECT * FROM ${table} WHERE email = ? `, [email], (err, data) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Something went wrong, please try again"
      });
    }

    if (data.length) {
      // check if email already exists
      if (data[0].email === email) {
        return res.status(400).json({
          error: true,
          message: "Email address already exists",
        })
      }
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    db.query(`INSERT INTO ${table} (full_name, email, password) VALUES (?, ?, ?)`, [fullName, email, hashPassword], 
    (err)=> {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "Something went wrong, we could not complete your registration",
          currentError: err
        })
      }
      
      return res.status(200).json({
        error: false,
        message: "Your account has been created"
      });
    })
  })
} 

// login controller
const loginUser = (req, res) => {
  const {email, password} = req.body;

  // check if user exists
  db.query(`SELECT * FROM ${table} WHERE email = ?`, [email], (err, data) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Something went wrong, please try again"
      });
    }

    // check if user credential is in database
    if (!data.length) {
      return res.status(404).json({
        error: true,
        message: "Email address does not exists, try creating an account"
      })
    }

    // check client password with hashedPassword in database
    const {full_name, password: userPassword} = data[0];
    const checkPassword = bcrypt.compareSync(password, userPassword);

    // account validation
    if (!checkPassword) {
      return res.status(400).json({
        error: true,
        message: "Invalid email address or password."
      })
    }

    // generate jsonwebtoken
    const { password: removePassword, ...userData } = data[0];
    const token = jwt.sign({ email: userData.email }, process.env.MY_SECRET);

    // set cookie with token
    res.cookie("user-token", token, {
      httpOnly: true,
    }).status(200).json({
      error: false,
      data: userData
    });
  })
}

// logout controller
const logoutUser = (req, res) => {
  res.clearCookie('user-token', {
    sameSite: "none",
    secure: true
  }).status(200).json({
    error: false,
    message: 'User logged out'
  });
}

module.exports = {createUsers, loginUser, logoutUser};
