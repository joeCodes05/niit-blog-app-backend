const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')

// routes
const authRoutes = require('./routes/auth/auth.routes');

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
