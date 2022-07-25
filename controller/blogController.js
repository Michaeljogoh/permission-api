const BlogPost = require('../models/blogModel');
const Users = require('../models/Users');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken')





// Sign Up
const registerUsers = async (req , res)  =>{
    const {firstname, lastname,  email , username , password , password2 } = req.body;
        //Validation
        if(!firstname ||!lastname|| !email || !username || !password || !password2 ){
            res.status(204).json({error:"Please fill in all field"})
        }
    
        if(password !== password2){
            res.status(204).json({error:"password does not match"})
    
        }
    
        if(password < 6){
           res.status(204).json({error:"password must not be less than six characters"})
        }
        
    const newEmail = await Users.findOne({email : email })
    
        if (newEmail){
            res.status(204).json({error:"Email already registered"})
          } 
    
    const newUser = await Users.findOne({username : username})
    
        if(newUser){
    
            res.status(204).json({error:"Username already exists!"})
    
    
        }  else {
    const newUser = new Users({firstname, lastname , email , username ,  password , password2})
            //Hash password
            const  hashedPassword = await bcrypt.hash(newUser.password, 10)
    
            newUser.password = hashedPassword
    
            await newUser.save();
            res.status(200).json({newUser})
    
        }
    
        }

 const loginUsers = async  (req , res ) =>{
    const {username , password} = req.body;

    if(!username || !password){
       res.status(400)
    }

const savedUser =  await Users.findOne({username:username})
        if(!savedUser){
         res.status(404)
        }

const doMatch =  await  bcrypt.compare(password, savedUser.password)
            if(doMatch){
               const token = jwt.sign({user_id:savedUser}, process.env.JWT_SECRET , {expiresIn : '1d'})
               res.status(200).json({token, user:savedUser.username})
            } else {
                return res.status(401)
            }
           
      
       
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
    





module.exports = {postBlogs , getPostBlogs, searchPostBlogs, updatePostBlogs, registerUsers , loginUsers ,deletePostBlogs}