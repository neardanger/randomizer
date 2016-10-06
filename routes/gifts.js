var express = require('express'),
    passport = require('passport'),
    giftRouter = express.Router(),
    giftCtrl = require('../controllers/gifts.js')

    giftRouter.route('/gifts')
        .get(giftCtrl.index)
        .post(giftCtrl.show)

    giftRouter.route('/gifts/:id', isLoggedIn)
        .post(giftCtrl.createGift)
        .put(giftCtrl.update)
        .get(giftCtrl.show)
        .delete(giftCtrl.destroy)


        //To check if the user is logged index

        function isLoggedIn(req,res,next){
            if(req.isAuthenticated()) return next()
            res.redirect('/login')
        }

        module.exports = giftRouter

    