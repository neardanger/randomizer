var User = require('../models/User.js')

module.exports = {
    index: function(req,res,next){
        User.find({},function(err,user){
            if(err) return console.log(err)
            res.json(user)
        })
    },

    create: function(req,res,next){
        User.create(req.body,function(err,user){
            if(err) return console.log(err)
            res.json(user)
        })
    },

    show: function(req,res,next){
        User.findOne({_id:req.params.id},function(err,user){
            if(err) return console.log(err)
            res.json(user)
        })
    },

    destroy: function(req,res,next){
        User.findOneAndRemove({_id:req.params.id},function(err,user){
            if(err) return console.log(err)
            res.json({success:true,message:"User was removed."})
        })
    },

    patch: function(req,res,next){
        User.findOneAndUpdate({_id:req.params.id},req.body,function(err,user){
            if(err) return console.log(err)
            user.save(function(err,user){
                if(err) return console.log(err)
                res.json({success:true, updatedUser:user})
            })
        })
    }
}
    