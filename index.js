const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// routes
const authRoutes = require('./routes/auth/auth.routes');
const postRoutes = require('./routes/posts/posts.routes');

const app = express();

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
