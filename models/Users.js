const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type: Date,
    default:Date.now()
})

const Users = mongoose.model('Users' , UserSchema);
module.exports = Users;