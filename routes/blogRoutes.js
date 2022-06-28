const express = require('express');
const app = express();
const router = express.Router();
const {postBlogs , getPostBlogs, searchPostBlogs, updatePostBlogs } = require('../controller/blogController')


router.get('/', getPostBlogs);

router.get('/search/:word', searchPostBlogs)

router.post('/postblogs', postBlogs);

router.patch('/postblogs/:id', updatePostBlogs)




module.exports = router;