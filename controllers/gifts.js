var Gift = require('../models/Gift.js')
var User = require('../models/User.js')

module.exports={

    index: function(req,res){
        Gift.find({},function(err,gifts){
            if(err) return console.log(err)
            res.json(gifts)
        })
    },


    show: function(req,res){
        Gift.findOne({_id:req.params.id},function(err,gifts){
            if(err) return console.log(err)
            res.json(gifts)
        })
    },

    createGift: function(req,res){
        User.findOne({id:req.params.id},function(err,user){
            if(err) return console.log(err)

            var newGift = new Gift(req.body)
            newGift._by = user
            newGift.save(function(err,gift){
                user.gift.push(gift)
                user.save(function(err,user){
                    if(err) return console.log(err)
                    res.json(user)
                })
            })
        })
    },

    update: function(req,res){
        Gift.findOne({_id:req.params.id},req.body,function(err,gift){
            if(err) return console.log(err)

            Gift.gift1 = req.body[0]
            Gift.gift2 = req.body[1]
            Gift.gift3 = req.body[3]




            gift.save(function(err,gift){
                if(err) return console.log(err)
                res.json({success:true,updatedGift:gift})

            })
        })
    },

    destroy: function(req,res){
        Gift.findOneAndRemove({_id:req.params.id}, function(err,gift){
            if(err) return console.log(err)
            res.json({success:true,message:'Gift was removed from the user'})
        })
     }
 }
