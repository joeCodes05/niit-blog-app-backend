const { createUsers, login } = require('../../controllers/auth/auth.controller');
const express = require('express');

const router = express.Router();

router.post('/signup', createUsers);
router.post('/login', login);

module.exports = router;