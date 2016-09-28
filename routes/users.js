var express = require('express'),
    passport = require('passport'),
    userRouter = express.Router(),
    userCtrl = require('../controllers/users.js')


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

        module.exports = userRouter