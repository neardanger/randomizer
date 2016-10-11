var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy, 
    User = require('../models/User.js') 


    passport.serializeUser(function(user,done){
        done(null,user.id)
    }) 

    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user)
        })
    })
    //Signing in
    passport.use('local-signup', new LocalStrategy({

        usernameField:'email',
        passwordField:'password',
        passReqToCallback: true}, 
        
        function(req,email,password,done){

        User.findOne({'local.email':email}, function(err,user){
            if(err) return done(err)
            if(user) return done(null,false,req.flash('signupMessage','Someone is already using that email'))

        var newUser = new User()
        newUser.local.name = req.body.name
        newUser.local.email = email
        newUser.local.password = newUser.generateHash(password)
        newUser.save(function(err){

            if(err) return console.log(err)
            return done(null,newUser,null)
            })
        })
    }))

    //Logging in 

    passport.use('local-login', new LocalStrategy({
        usernameField:'email',
        passwordField: 'password',
        passReqToCallback: true}, 
        
        function(req,email,password,done){
        User.findOne({'local.email':email}, function(err,user){
            if(err) return done(err)
            if(!user) return done (null,false,req.flash('loginMessage','That user does not exist!'))
            if(!user.validPassword(password)) return done(null,false,req.flash('loginMessage','That is not the correct password'))
        })
    }))


module.exports = passport



    

    