const { createUsers, loginUser, logoutUser } = require('../../controllers/auth/auth.controller');
const express = require('express');

const router = express.Router();

router.post('/signup', createUsers);
router.post('/signin', loginUser);
router.post('/signout', logoutUser);

module.exports = router;