## permission-api
Permission-api is a simple and easy to use api. For those who wish to setup an operable blog in minutes, this is the project for you. The blog is built with Node.js, w/ Express.js, and Mongodb (with the mongoose driver) and jwt. 
The instructions on how to consume the api is below

Current verison: 0.2.2

## Features
- nIntergration of the lightweight rich text editor, NicEdit.
- Utilizes the Express web framework.
- Uses MongoDB on the backend.
- An Admin interface, initiated by a password confirmation.
- Easy Heroku integration.
- Create, edit, and delete your posts.


##Heroku Link

https://permission-api675.herokuapp.com/

Prerequisites
Node.js (version 0.10.0 or above, download here)
NPM (comes with recent versions of node)
Express.js (version 3 or above, and will be install with npm)
A recent version of Mongodb (download here)
Mongoose (will be installed with npm)
Tutorial: Getting Started
In your terminal, 'cd' to the directory where you want to develop the blog and do the following commands

- git clone https://github.com/Michaeljogoh/permission-api
-  cd blog-folder-name
- npm install .
In order to initiate the blog server on your local machine, do the following command (You need node.js to run the following command) $ node blog The blog should be running on your localhost at the 3000 port; go to http://localhost:3000 to view it. And it should look similar to the screenshot below.


When successfully logged in, your navigation bar should have three new options appended to it...

Users-New (create a new post)
Users-Delete (delete a post)
Users-Logout (log out of admin view)



# The new modified code

router.get('/', getPostBlogs);

router.get('/search/:word', searchPostBlogs);

router.post('/register', registerUsers);

router.post('/login', loginUsers);

router.post('/postblogs', ensureAuthenticated, postBlogs);

router.patch('/postblogs/:id', ensureAuthenticated, updatePostBlogs);

router.delete('/postblogs/:id', ensureAuthenticated, deletePostBlogs)




Optional: Heroku Setup

*Note: You must have a heroku account along with the Heroku Toolbelt to follow this part of the tutorial
Simply follow the directions on this page to deploy the blog with heroku. However, in order to use MongoDB, you must enter the following command in the directory of your project



# Contributors
asylcreek


