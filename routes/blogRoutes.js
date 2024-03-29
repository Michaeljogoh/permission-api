const express = require('express');
const app = express();
const router = express.Router();
const {postBlogs , getPostBlogs, searchPostBlogs, updatePostBlogs , registerUsers , loginUsers ,  deletePostBlogs} = require('../controller/blogController')
const { ensureAuthenticated } = require('../middleware/authorization')




router.get('/', getPostBlogs);

router.get('/search/:word', searchPostBlogs);

router.post('/register', registerUsers);

router.post('/login', loginUsers);



router.post('/postblogs', ensureAuthenticated, postBlogs);

router.patch('/postblogs/:id', ensureAuthenticated, updatePostBlogs);

router.delete('/postblogs/:id', ensureAuthenticated, deletePostBlogs)




module.exports = router;