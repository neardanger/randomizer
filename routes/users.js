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
            res.render('index',{user: req.user})
        })

    userRouter.route('/signup')
        .get(function(req,res){
            res.render('signup',{message: req.flash('signupMessage'),user:req.user}) 
        })
        .post(passport.authenticate('local-signup',{
            successRedirect : '/profile',
            failureRedirect : '/signup'

        }))

    userRouter.route('/login')
        .get(function(req,res){
            res.render('login',{message:req.flash('loginMessage'),user:req.user})
        })
        .post(passport.authenticate('local-login',{
            successRedirect:'/profile',
            failureRedirect:'/login'
        }))

    userRouter.get('/profile',isLoggedIn,function(req,res){
        res.render('profile',{user:req.user})
    })

    userRouter.get('/logout',function(req,res){
        req.logout()
        res.redirect('/')
    })


        function isLoggedIn(req,res,next) {
         if (req.isAuthenticated()) return next()
         res.redirect('/login')
}
    



        module.exports = userRouter