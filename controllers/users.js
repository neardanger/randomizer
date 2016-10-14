var User = require('../models/User.js')

module.exports = {
    index: function(req,res){
        User.find({},function(err,users){
            if(err) return console.log(err)
            res.json(users)
        })
    },

    create: function(req,res){
        User.create(req.body,function(err,users){
            if(err) return console.log(err)
            res.json(users)
        })
    },

    show: function(req,res){
        User.findOne({_id:req.params.id},function(err,users){
            if(err) return console.log(err)
            res.json(users)
        })
    },

    destroy: function(req,res){
        User.findOneAndRemove({_id:req.params.id},function(err,user){
            if(err) return console.log(err)
            res.json({success:true,message:"User was removed."})
        })
    },

    patch: function(req,res){
        User.findOneAndUpdate({_id:req.params.id},req.body,function(err,user){
            if(err) return console.log(err)
            user.save(function(err,user){
                if(err) return console.log(err)
                res.json({success:true, updatedUser:user})
            })
        })
    }
}
    