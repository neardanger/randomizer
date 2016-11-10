var express = require('express'),
    passport = require('passport'),
    giftRouter = express.Router(),
    giftCtrl = require('../controllers/gifts.js')
    



    giftRouter.get('/savedgifts/',isLoggedIn,function(req,res){
        res.render('savedgifts',{user:req.user})
    })





    giftRouter.route('/savedgifts/',isLoggedIn)
        .get(giftCtrl.index)
        .post(giftCtrl.createGift)

    giftRouter.route('/savedgifts/:id', isLoggedIn)
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

    