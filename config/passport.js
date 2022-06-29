const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');


module.exports = (passport) =>{ 
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
            //match user
            Users.findOne({email:email})
            .then(user =>{
                if(!user){
                  return done (null , false , {message:"Email is registerd"})
                }
                // match password
                bcrypt.compare(password, user.password, (err , isMatch)=>{
                    if(err) {
                        throw err
                    }
                    if(isMatch){
                        return done(null , user)
                    } else {
                        return  done(null , false)
                    }
                    
                });
            })
            .catch(err=> console.log(err))
        })
    )

//    serialize users
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
    //  deserializer  users
      passport.deserializeUser((id, done)=> {
        Users.findById(id, function(err, user) {
          done(err, user);
        });
      });


}
