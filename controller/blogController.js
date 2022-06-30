const BlogPost = require('../models/blogModel');
const Users = require('../models/Users');
const bcrypt  = require('bcrypt');
const passport = require('passport');




// Register User
 const registerUsers = (req, res) =>{
    const {firstname, lastname , username, email , password , password2 , date} = req.body
    let errors = []
    // validation
    if(!firstname || !lastname|| !username || !email || !password || !password2){
     errors.push({msg: "Please fill in all fields"})
    }
    // if password is not match
    if(password !== password2){
     errors.push({msg: "Password does not match"})
    }
    // password must be six characters
    if(password < 6){
     errors.push({msg: "Password must not be less than six characters"})
    }

    // render form if no error caught
    if(errors < 0){
        res.render({errors , firstname , lastname, username , email , password , password2})
    }  else {

    Users.findOne({email:email})
    .then(user =>{
         if(user){
            errors.push({msg: "Email already exist"})
         } else {

    const newUser = new Users({firstname, lastname ,  username , email ,  password})
            //  hash password
     bcrypt.genSalt(10, ( err , salt)=>
         bcrypt.hash(newUser.password, salt, (err,hash)=>{
                if(err) throw err;
             
                newUser.password = hash;
                
                //save user

                newUser.save();
                res.status(200).send("Registered");
              
        }))
    
  
    }
   })
}
 }

//    Login 
const loginUsers = (req , res , next)  =>{
        passport.authenticate('local', {
            successRedirect:"/",
            failureRedirect:"/login",
            failureFlash:true
        })
        next();

}

// Logout
const logoutUsers = (req,res)=>{
    req.logout();
    res.redirect('/login');
}


// post 
const postBlogs = async (req , res) =>{
    const {title , content , author } = req.body
    await BlogPost.create({title , content , author});
    res.status(200).send('Blog Post Added');
};
// getPostBlog paginational
const getPostBlogs = async (req , res) =>{
    // query with page limit 
    const {page = 1, limit = 5} = req.query;

    const getPosts = await BlogPost.find()
    .limit(limit * 1)
    .skip((page - 1 ) * limit)
    .exec();
    //Get Total documents in blogPost collection
const count = await BlogPost.countDocuments();
res.json({getPosts, totalPages:Math.ceil(count / limit), currentPage: page})
};

// search
const searchPostBlogs =  async (req , res)=>{
    const {page = 1, limit = 5} = req.query;
    const searchPosts = await BlogPost.find({'$options':[{title:{$regex:req.params.word}}]})
    .limit(limit * 1)
    .skip((page - 1 ) * limit)
    .exec();
    //Get Total documents in blogPost collection
const search = await BlogPost.countDocuments();
    res.status(200).json({searchPosts,  totalPages:Math.ceil(search/ limit), currentPage: page});
}

// update
const updatePostBlogs = async (req , res ) =>{
    const {title , content , author } = req.body;
    if (author !== author) {
        res.status(404).send('Not Found')
    } else {
        await BlogPost.findByIdAndUpdate(req.params.id, {title , content , author});
        res.status(200).send("Updated!!!")
    }
   
 
}

const deletePostBlogs = async (req , res) =>{
    const {title , content , author } = req.body;
    if(author !== author ){
        res.status(400).send('Can not delete the post')
    } else {
        await BlogPost.findByIdAndDelete(req.params.id, {title , content , author});
        res.status(200).send("Deleted!!!")
    }
    }
    





module.exports = {postBlogs , getPostBlogs, searchPostBlogs, updatePostBlogs, registerUsers , loginUsers , logoutUsers, deletePostBlogs}