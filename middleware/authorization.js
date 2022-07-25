const jwt = require('jsonwebtoken');
const Users = require('../models/Users')

const ensureAuthenticated = async (req , res ) =>{
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401)
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token , process.env.jwt_secret , async (err , payload)=>{
        if(err){
            res.status(401)
        }
    const {_id} = payload
    const userdata = await Users.findById(_id)
    req.user = userdata
    next()
    })
} 

module.exports =  { ensureAuthenticated }