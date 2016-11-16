var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../models/User.js') ,
    configAuth = require('../config/auth.js')





//The user object turns into a cookie here
    passport.serializeUser(function(user,done){
        done(null,user.id)
    }) 

//The cookie goes into usser object
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user)
        })
    })
    //create a user
    passport.use('local-signup', new LocalStrategy({

        usernameField:'email',
        passwordField:'password',
        passReqToCallback: true
    }, 
        
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
        passReqToCallback: true
    }, 
        
        function(req,email,password,done){
        User.findOne({'local.email':email}, function(err,user){
            if(err) return done(err)
            if(!user) return done (null,false,req.flash('loginMessage','That user does not exist!'))
            if(!user.validPassword(password)) return done(null,false,req.flash('loginMessage','That is not the correct password'))
            return done(null,user)
        })
    }))


    passport.use(new FacebookStrategy({
        clientID: configAuth.facebook.clientID,
        clientSecret: configAuth.facebook.clientSecret,
        callbackURL: configAuth.facebook.callbackURL,
        profileFields: configAuth.facebook.profileFields

    }, function(token,refreshToken,profile,done){
        User.findOne({'facebook.id': profile.id}, function(err,user){
            if(err) return done(err)
            if(user) return done(null,user)
            var newUser = new User()
            newUser.facebook.id = profile.id
            newUser.facebook.token = token
            newUser.facebook.name = profile.name.givenName + '' + profile.name.familyName;
            newUser.facebook.email = profile.emails[0].value
            newUser.save(function(err){
                if(err) return console.log(err)
                return done(null,newUser)
            })
        })
    }))


module.exports = passport



    

    