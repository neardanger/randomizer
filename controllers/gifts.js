var Gift = require('../models/Gift.js')
var User = require('../models/User.js')

module.exports = {

    index: function(req,res){
        Gift.find({},function(err,gifts){
            if(err) return console.log(err)
            res.json(gifts)
        })
    },


    show: function(req,res){
        Gift.findOne({_id:req.user_.id})
        .populate('gifts')
        .exec(function(err,gift){
            console.log(req.body)
            if(err) return console.log(err)
            console.log(gift)
            res.json(gift)

        })
    },

    createGift: function(req,res){
        console.log(req.params.id)
        User.findOne({_id: req.params.id},function(err,user){
            if(err) throw err
            var newGift = new Gift(req.body)
            newGift._by = user
            newGift.save(function(err,gift){
                console.log("Gifts Fulfilled",gift);
                user.gifts.push(gift)
                user.save(function(err,user){
                    if(err) throw err
                    res.json(user)
                })
            })
        })
    },

    update: function(req,res){
        Gift.findOne({_id: req.params.id},req.body, {new:true}).upsert().update(function(err,gift){
            if(err) throw err

            Gift.gift1 = req.body[0]
            Gift.gift2 = req.body[1]
            Gift.gift3 = req.body[2]




            gift.save(function(err,gift){
                if(err) return console.log(err)
                res.json({success:true,updatedGift:gift})

            })
        })
    },

    destroy: function(req,res){
        Gift.findOneAndRemove({_id: req.params.id}, function(err){
            if(err) throw err
            res.json({success:true,message:'Gift was removed from the user'})
        })
     }
 }

 //Finite

