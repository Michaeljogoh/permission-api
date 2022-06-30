const express = require('express');
const app = express();
const router = express.Router();
const {postBlogs , getPostBlogs, searchPostBlogs, updatePostBlogs , registerUsers , loginUsers , logoutUsers, deletePostBlogs} = require('../controller/blogController')


router.get('/', getPostBlogs);

router.get('/search/:word', searchPostBlogs);

router.post('/register', registerUsers);

router.post('/login', loginUsers);

router.get('/logout', logoutUsers);

router.post('/postblogs', postBlogs);

router.patch('/postblogs/:id', updatePostBlogs);

router.delete('/postblogs/:id', deletePostBlogs)




module.exports = router;