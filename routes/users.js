var express = require('express'),
    passport = require('passport'),
    userRouter = express.Router(),
    userCtrl = require('../controllers/users.js'),
    User = require('../models/User.js')
    Gift = require('../models/Gift.js')


    userRouter.route('/users')
        .get(userCtrl.index)
        .post(userCtrl.create)

    userRouter.route('/users/:id')
        .get(userCtrl.show)
        .delete(userCtrl.destroy)
        .patch(userCtrl.patch)

    userRouter.route('/')
        .get(function(req,res){
            res.render('index')
        })

    userRouter.route('/signup')
        .get(function(req,res){
            res.render('signup',{message: req.flash('signIn'),user:req.user}) 
        })
        .post(passport.authenticate('local-signup',{
            successRedirect : '/',
            failureRedirect : '/signup'

        }))
    userRouter.route('/login')
        .get(function(req,res){

        })




        function isLoggedIn(res,req,next){
            if(req.isAuthenticated()) return next()
            res.redirect('/signup')
        }
    



        module.exports = userRouter