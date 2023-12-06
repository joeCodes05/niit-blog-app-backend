const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')

// routes
const authRoutes = require('./routes/auth/auth.routes');

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Content-Type", "Application/json");
  next();
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
