const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');


module.exports = (passport) =>{ 
    passport.use(
        new LocalStrategy({usernameField: 'username'}, (username, password, done)=>{
            //match user
            Users.findOne({username:username})
            .then(user =>{
                if(!user){
                  return done (null , false , {message:"Username is registerd"})
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
