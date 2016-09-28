// var passport = require('passport'),
//     LocalStrategy = require('passport-local').Strategy,
//     FacebookStrategy = require('passport-facebook').Strategy, 
//     User = require('../models/User.js') 
//     configAuth = require('./auth.js')


//     passport.serializeUser(function(user,done){
//         done(null,user.id)
//     }) 

//     passport.deserializeUser(function(id,done){
//         User.findById(id,function(err,user){
//             done(err,user)
//         })
//     })

//     passport.use('local-signup',new LocalStrategy)