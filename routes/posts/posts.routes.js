const express = require('express');
const { getPosts } = require('../../controllers/posts/post.controller');

const router = express.Router();

router.get('/', getPosts);

module.exports = router;